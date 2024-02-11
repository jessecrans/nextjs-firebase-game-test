"use client";

import React from 'react'
import { useObject } from 'react-firebase-hooks/database';
import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase/firebase';
import UsernameDialog from '@/components/user/UsernameDialog';
import { User } from '@/lib/users/user';

const Game = ({
  params
}: {
  params: {
    gameID: string
  }
}) => {
  const gameRef = ref(db, `games/${params.gameID}`);
  const [game, loading, error] = useObject(gameRef);

  const handleUserSubmit = (user: User) => {
    if (!game?.val().user1.id) {
      set(ref(db, `games/${params.gameID}/user1`), { id: user.id, name: user.name });
    } else if (!game?.val().user2.id) {
      set(ref(db, `games/${params.gameID}/user2`), { id: user.id, name: user.name });
    }
  }

  return (
    <div>{params.gameID}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error?.message}</div>}
      {
        game &&
        (!game?.val().user1.id || !game?.val().user2.id) &&
        !(game?.val().user1 && game?.val().user1?.id === JSON.parse(localStorage.getItem('user') || '{}').id) &&
        <UsernameDialog onSubmit={handleUserSubmit} />
      }
      {
        game &&
        <div>
          <p>
            {game?.val().user1.name}
          </p>
          <p>
            {game?.val().user2.name}
          </p>
        </div>
      }
    </div>
  )
}

export default Game