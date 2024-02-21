import { Game } from '@/lib/firebase/database'
import React from 'react'
import Board from './Board'

const Game = ({
  game
}: {
  game: Game
}) => {
  return (
    <div>
      <div className='m-4 mt-0'>
        <p className="text-2xl">
          {game.user1.name} (X)
        </p>
        <p>
          vs
        </p>
        <p className="text-2xl">
          {game.user2.name} (O)
        </p>
      </div>
      <Board board={game.board} />
    </div>
  )
}

export default Game