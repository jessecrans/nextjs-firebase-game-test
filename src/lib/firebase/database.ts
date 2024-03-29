"use server";

import { ref, push, set, get, update } from "firebase/database";
import { adminDb as db } from "./firebase-admin";
import { User, getUser } from "../users/user";
import { getWinner, getTurnNumber, checkGameOver } from "../game/game";

export type Game = {
  user1: {
    id: string,
    name: string,
    wins: number
  },
  user2: {
    id: string,
    name: string,
    wins: number
  },
  board: string[][],
  lastMoveTime: number,
  turn: string // user1.id or user2.id
}

/**
 * Creates a new game in the database.
 * 
 * @returns A promise that resolves to the key of the new game
 */
export const createGame = async () => {
  // const newGameRef = await push(ref(db, 'games'));
  const newGameRef = await db.ref('games').push();
  await newGameRef.set({
    user1: {
      id: '',
      name: '',
      wins: 0
    },
    user2: {
      id: '',
      name: '',
      wins: 0
    },
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    lastMoveTime: Date.now(),
    turn: ""
  });

  return newGameRef.key;
}

/**
 * Adds a user to a game.
 * 
 * @param gameID 
 * @param user 
 */
export const addUserToGame = async (gameID: string, user: User) => {
  const gameRef = db.ref(`games/${gameID}`);
  const game = await gameRef.get();

  if (!game.val().user1?.id) {
    const userRef = db.ref(`games/${gameID}/user1`);
    await userRef.set({ id: user.id, name: user.name });
  } else if (!game.val().user2?.id) {
    const updates: { [key: string]: any } = {};
    updates['/user2'] = { id: user.id, name: user.name };
    updates['/turn'] = Math.random() < 0.5 ? game.val().user1.id : user.id;
    await gameRef.update(updates);
  }
}

/**
 * Make a move in the game
 * 
 * @param row Row of the move
 * @param col Column of the move
 * @returns A promise that resolves when the database has been updated
 */
export const makeMove = async (row: number, col: number, gameID: string, userID: string) => {
  const gameRef = db.ref(`games/${gameID}`);
  const game = (await gameRef.get()).val() as Game;

  if (game.turn !== userID || game.board[row][col] !== '' || checkGameOver(game)) {
    return;
  }

  const newBoard = game.board.map((r, rowIndex) => {
    return r.map((cell, cellIndex) => {
      if (rowIndex === row && cellIndex === col) {
        return getTurnNumber(game) % 2 === 0 ? 'X' : 'O';
      }
      return cell;
    })
  })

  const updates: { [key: string]: any } = {};
  updates['/board'] = newBoard;
  updates['/lastMoveTime'] = Date.now();

  const newTurn = game.turn === game.user1.id ? game.user2.id : game.user1.id;

  updates['/turn'] = newTurn;

  const winner = getWinner({ ...game, board: newBoard, turn: newTurn });
  if (winner) {
    if (game.user1.id === winner) {
      updates['/user1/wins'] = game.user1.wins ? game.user1.wins + 1 : 1;
    } else {
      updates['/user2/wins'] = game.user2.wins ? game.user2.wins + 1 : 1;
    }
  }

  return gameRef.update(updates);
}

export const nextGame = async (gameID: string) => {
  const gameRef = db.ref(`games/${gameID}`);
  const game = (await gameRef.get()).val() as Game;

  const updates: { [key: string]: any } = {};
  updates['/board'] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  updates['/lastMoveTime'] = Date.now();
  const winner = getWinner(game);
  if (winner) {
    updates['/turn'] = winner === game.user1.id ? game.user2.id : game.user1.id;
  } else {
    updates['/turn'] = Math.random() < 0.5 ? game.user1.id : game.user2.id;
  }

  return gameRef.update(updates);
}