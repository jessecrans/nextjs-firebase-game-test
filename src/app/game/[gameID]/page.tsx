'use client';

import React, { useEffect } from 'react'
import { useObject } from 'react-firebase-hooks/database';
import { DataSnapshot, ref, remove } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';
import UsernameDialog from '@/components/user/UsernameDialog';
import { getUser } from '@/lib/users/user';
import PageLayout from '@/layouts/PageLayout';
import { notFound } from 'next/navigation';

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

  return (
    <PageLayout>
      {
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : !displayGame(game) ? (
          <div>
            <p>Game ID: {params.gameID}</p>
            <div>
              <p>Player 1: {game?.val().user1?.name || "..."}</p>
              <p>Player 2: {game?.val().user2?.name || "..."}</p>
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