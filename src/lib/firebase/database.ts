import { ref, set, push } from "firebase/database";
import { db } from "@/lib/firebase/firebase";

export const createGame = async () => {
  const newGameRef = push(ref(db, 'games'));
  set(newGameRef, {
    user1: {
      id: '',
      name: ''
    },
    user2: {
      id: '',
      name: ''
    },
    spectators: [],
    state: {
      board: []
    }
  })

  return newGameRef.key;
}