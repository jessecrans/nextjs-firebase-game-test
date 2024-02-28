import { Game } from "../firebase/database";

/**
 * Get the number of turns that have been made in the game
 * 
 * @returns The number of turns that have been made in the game
 */
export const getTurnNumber = (game: Game) => {
  return game.board.reduce((total, row) => {
    return total + row.reduce((rowTotal, cell) => {
      return cell !== '' ? rowTotal + 1 : rowTotal;
    }, 0)
  }, 0)
}

/**
 * Gets the user id of the winner, or an empty string if the game has not been won
 * 
 * @param board The game board
 * @returns The user id of the winner, or an empty string if the game has not been won
 */
export const getWinner = (game: Game) => {
  const board = game.board;
  const potentialWinner = game.user1.id === game.turn ? game.user2.id : game.user1.id;

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return potentialWinner;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return potentialWinner;
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return potentialWinner;
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return potentialWinner;
  }

  return '';
}

/**
 * Check if the game is a draw
 * 
 * @param game The game to check
 * @returns Whether the game is a draw
 */
export const checkDraw = (game: Game) => {
  return getTurnNumber(game) === 9;
}

/**
 * Check if the game is over
 * 
 * @param game The game to check
 * @returns Whether the game is finished
 */
export const checkGameOver = (game: Game) => {
  return !!getWinner(game) || checkDraw(game);
}