import { ref, get, set, push } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { User } from "../users/user";

/**
 * Creates a new game in the database.
 * 
 * @returns A promise that resolves to the key of the new game
 */
export const createGame = async () => {
  const newGameRef = push(ref(db, 'games'));
  set(newGameRef, {
    user1: {
      id: '',
      name: ''
    },
    user2: {
      id: '',
      name: ''
    },
    spectators: [],
    state: {
      board: []
    }
  })

  return newGameRef.key;
}

/**
 * Adds a user to a game.
 * 
 * @param gameID 
 * @param user 
 */
export const addUserToGame = async (gameID: string, user: User) => {
  const gameRef = ref(db, `games/${gameID}`);
  const game = await get(gameRef);

  if (!game.val().user1?.id) {
    set(ref(db, `games/${gameID}/user1`), { id: user.id, name: user.name });
  } else if (!game.val().user2?.id) {
    set(ref(db, `games/${gameID}/user2`), { id: user.id, name: user.name });
  }
}