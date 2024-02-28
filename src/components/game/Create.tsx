"use client";
import React from 'react'
import { createGame } from '@/lib/firebase/database'
import { useRouter } from 'next/navigation';

const Create = () => {
  const router = useRouter();

  const handleCreateGame = async () => {
    const newGameId = await createGame();
    router.push(`/game/${newGameId}`);
  }

  return (
    <button
      onClick={handleCreateGame}
      className='p-2 bg-green-500 text-white rounded m-4'
    >
      Create Game
    </button>
  )
}

export default Create