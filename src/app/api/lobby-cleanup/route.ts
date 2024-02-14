import { ref, remove, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { Game } from "@/lib/firebase/database";

export const runtime = 'nodejs';

export const GET = (request: Request) => {
  const cutOffTime = Date.now() - 1000 * 60 * 5; // 5 minutes ago
  const gamesRef = ref(db, 'games');
  console.log("GET /api/lobby-cleanup")
  get(gamesRef).then(async (snapshot) => {
    console.log("Data read successfully", snapshot.val());
    for (const [gameId, game] of Object.entries<Game>(snapshot.val())) {
      if (game.lastMoveTime < cutOffTime) {
        console.log(`Game ${gameId} is too old and will be removed.`);
        await remove(ref(db, `games/${gameId}`));
      }
    }
  }).catch((error) => {
    console.error("Error getting data:", error);
  });

  return new Response("Lobbies cleaned up.");
}