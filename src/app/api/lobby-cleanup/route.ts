import { ref, remove, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { Game } from "@/lib/firebase/database";

export const runtime = 'edge';

export const GET = async (request: Request) => {
  console.log("Cleaning up lobbies...")

  const cutOffTime = Date.now() - 1000 * 60 * 5; // 5 minutes ago
  const gamesRef = ref(db, 'games');
  const snapshot = await get(gamesRef)
  console.log("Data read successfully", snapshot.val());

  for (const [gameId, game] of Object.entries<Game>(snapshot.val())) {
    if (game.lastMoveTime < cutOffTime) {
      console.log(`Game ${gameId} is too old and will be removed.`);
      remove(ref(db, `games/${gameId}`));
    }
  }

  return new Response("Lobbies cleaned up.");
}