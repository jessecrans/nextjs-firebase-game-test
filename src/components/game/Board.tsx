import PageLayout from '@/layouts/PageLayout'
import React from 'react'
import { makeMove } from '@/lib/firebase/database'
import { getUser } from '@/lib/users/user'

const Board = ({
  board,
  gameID
}: {
  board: string[][]
  gameID: string
}) => {
  return (
    <div className='grid grid-rows-3 grid-cols-3 gap-4 aspect-square max-w-xl m-auto min-w-72'>
      {
        board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className='bg-gray-400 bg-opacity-50 flex justify-center items-center relative'
              onClick={async () => await makeMove(rowIndex, cellIndex, gameID, getUser().id)}
            >
              {
                cell === 'X' ? (
                  <>
                    <div className="absolute inset-0 m-auto h-4 w-full bg-black rotate-45"></div>
                    <div className="absolute inset-0 m-auto h-4 w-full bg-black -rotate-45"></div>
                  </>
                ) : cell === 'O' && (
                  <div className='h-5/6 w-5/6 border-[16px] border-black rounded-full'></div>
                )
              }
            </button>
          ))
        ))
      }
    </div>
  )
}

export default Board