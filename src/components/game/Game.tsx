import { Game, nextGame } from '@/lib/firebase/database'
import React, { useEffect, useState } from 'react'
import Board from './Board'
import { getUser } from '@/lib/users/user'
import { checkGameOver, getTurnNumber } from '@/lib/game/game'

const Game = ({
  game,
  gameID
}: {
  game: Game,
  gameID: string
}) => {
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setGameOver(checkGameOver(game));
  }, [game]);

  return (
    <div>
      <div className="m-4 mt-0">
        <p className={`text-2xl ${game.turn === game.user2.id && 'opacity-50'}`}>
          ({(game.turn === game.user1.id && getTurnNumber(game) % 2 === 0) || (game.turn === game.user2.id && getTurnNumber(game) % 2 !== 0) ? "X" : "O"})&nbsp;
          {game.user1.name}
          &nbsp;({game.user1.wins ? game.user1.wins : 0})&nbsp;
          {/* {game.turn === game.user1.id && "<-"} */}
        </p>
        <p>
          vs
        </p>
        <p className={`text-2xl ${game.turn === game.user1.id && 'opacity-50'}`}>
          ({(game.turn === game.user1.id && getTurnNumber(game) % 2 === 0) || (game.turn === game.user2.id && getTurnNumber(game) % 2 !== 0) ? "O" : "X"})&nbsp;
          {game.user2.name}
          &nbsp;({game.user2.wins ? game.user2.wins : 0})&nbsp;
          {/* {game.turn === game.user2.id && "<-"} */}
        </p>
      </div>
      <Board board={game.board} gameID={gameID} />
      {
        gameOver && (getUser().id === game.user1.id ? (
          <button
            className='p-4 rounded bg-green-500 text-white m-4'
            onClick={async () => await nextGame(gameID)}
          >
            Play again
          </button>
        ) : (
          <p className='m-4'>Waiting for host to continue...</p>
        ))
      }
    </div>
  )
}

export default Game