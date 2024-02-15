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
      <Board board={game.board} />
    </div>
  )
}

export default Game