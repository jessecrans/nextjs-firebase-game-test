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
    >
      Create Game
    </button>
  )
}

export default Create