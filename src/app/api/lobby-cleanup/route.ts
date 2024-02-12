import { ref, remove, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { Game } from "@/lib/firebase/database";

export const GET = (request: Request) => {
  const cutOffTime = Date.now() - 1000 * 60 * 60 * 3; // 3 hours ago
  const gamesRef = ref(db, 'games');
  get(gamesRef).then((snapshot) => {
    for (const [gameId, game] of Object.entries<Game>(snapshot.val())) {
      if (game.lastMoveTime < cutOffTime) {
        remove(ref(db, `games/${gameId}`));
      }
    }
  })
}