"use client";
import React from 'react'
import { createGame } from '@/lib/firebase/database'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Create = () => {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const handleCreateGame = async () => {
    setCreating(true);
    const newGameId = await createGame();
    router.push(`/game/${newGameId}`);
  }

  return (
    creating ? (
      <div className='p-2 m-4'>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    ) : (
      <button
        onClick={handleCreateGame}
        className='p-2 bg-green-500 text-white rounded m-4 hover:bg-green-600'
      >
        Create Game
      </button>
    )
  )
}

export default Create