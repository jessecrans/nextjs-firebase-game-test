import PageLayout from '@/layouts/PageLayout'
import React from 'react'

const Board = ({
  board
}: {
  board: string[][]
}) => {
  return (
    <div className='grid grid-rows-3 grid-cols-3 gap-4 aspect-square max-w-xl m-auto min-w-72'>
      {
        board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div key={cellIndex} className='bg-gray-400 bg-opacity-50 flex justify-center items-center relative'>
              {
                cell === 'X' ? (
                  <>
                    <div className="absolute inset-0 m-auto h-4 w-full bg-black rotate-45"></div>
                    <div className="absolute inset-0 m-auto h-4 w-full bg-black -rotate-45"></div>
                  </>
                ) : (
                  <div className='h-5/6 w-5/6 border-8 border-black rounded-full'></div>
                )
              }
            </div>
          ))
        ))
      }
    </div>
  )
}

export default Board