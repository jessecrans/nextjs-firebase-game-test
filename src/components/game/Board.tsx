import PageLayout from '@/layouts/PageLayout'
import React from 'react'

const Board = ({
  board
}: {
  board: string[][]
}) => {
  return (
    <div className='grid grid-cols-3 grid-rows-3'>
      {
        board.map((row, rowIndex) => (
          <div key={rowIndex} className='col-span-3 grid grid-cols-subgrid'>
            {
              row.map((cell, cellIndex) => (
                <span key={cellIndex} className='text-center border-2'>{"X"}</span>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Board