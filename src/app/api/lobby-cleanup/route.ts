import { ref, remove, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { Game } from "@/lib/firebase/database";

export const GET = (request: Request) => {
  const cutOffTime = Date.now() - 1000 * 60 * 20; // 20 minutes ago
  const gamesRef = ref(db, 'games');
  get(gamesRef).then((snapshot) => {
    for (const [gameId, game] of Object.entries<Game>(snapshot.val())) {
      if (game.lastMoveTime < cutOffTime) {
        remove(ref(db, `games/${gameId}`));
      }
    }
  })

  return new Response("Lobbies cleaned up.");
}