import { ref, remove, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { Game } from "@/lib/firebase/database";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
  const cutOffTime = Date.now() - 1000 * 60 * 60 * 3; // 3 hours ago
  const gamesRef = ref(db, 'games');

  await get(gamesRef).then((snapshot) => {
    for (const [gameId, game] of Object.entries<Game>(snapshot.val())) {
      if (game.lastMoveTime < cutOffTime) {
        remove(ref(db, `games/${gameId}`)).catch((error) => {
          console.error("Error deleting game", gameId, error);
        });
      }
    }
  }).catch((error) => {
    console.error("Error reading data", error);
  });

  return new Response("Lobbies cleaned up.");
}