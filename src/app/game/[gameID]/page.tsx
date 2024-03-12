'use client';

import React, { useEffect, useState } from 'react'
import { useObject } from 'react-firebase-hooks/database';
import { DataSnapshot, ref, remove } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';
import UsernameDialog from '@/components/user/UsernameDialog';
import { getUser } from '@/lib/users/user';
import PageLayout from '@/layouts/PageLayout';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

import Game from '@/components/game/Game';

const GamePage = ({
  params
}: {
  params: {
    gameID: string
  }
}) => {
  const gameRef = ref(db, `games/${params.gameID}`);
  const [game, loading, error] = useObject(gameRef);
  const [copiedGameLink, setCopiedGameLink] = useState(false);

  if (game && !game.val()) { // if there is no game with the given ID
    notFound();
  }

  /**
   * Determine if the username dialog should be displayed.
   * 
   * @param game 
   * @returns True if the game exists, is not full, and the current user is not already in the game, otherwise false
   */
  const displayUsernameDialog = (game: DataSnapshot | undefined) => {
    return (
      game && // the game exists
      (!game.val().user1?.id || !game.val().user2.id) && // the game is not full
      !(game.val().user1 && game.val().user1?.id === getUser().id) // the current user is not already in the game
    )
  }

  /**
   * Determine if the game should be displayed.
   * 
   * @param game 
   * @returns True if the game exists and both users are in the game, otherwise false
   */
  const displayGame = (game: DataSnapshot | undefined) => {
    return (
      game && // the game exists
      game.val().user1.id && // user1 exists
      game.val().user2.id // user2 exists
    )
  }

  const copyGameLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedGameLink(true);
  }

  return (
    <PageLayout>
      {
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : !displayGame(game) ? (
          <div className='flex flex-col gap-2 items-center'>
            <p>
              <span className='mb-2'>
                Game ID:
              </span>
              <button
                className='bg-white rounded p-2 inline-block group overflow-hidden'
                onClick={copyGameLink}
              >
                <span className='mr-2'>
                  {params.gameID}
                </span>
                {
                  copiedGameLink ?
                    <span className='text-green-500 transition duration-300 transform rotate-[360deg] inline-block'><FontAwesomeIcon icon={faCheck} /></span> :
                    <span className='group-hover:opacity-50'>< FontAwesomeIcon icon={faCopy} /></span>
                }
              </button>
            </p>
            <div>
              <p><span>{game?.val().user1?.name || "..."}</span></p>
              <p>vs</p>
              <p><span>{game?.val().user2?.name || "..."}</span></p>
            </div>
            {
              displayUsernameDialog(game) &&
              <UsernameDialog gameID={params.gameID} />
            }
          </div>
        ) : (
          <Game game={game?.val()} gameID={params.gameID} />
        )
      }
    </PageLayout>
  )
}

export default GamePage