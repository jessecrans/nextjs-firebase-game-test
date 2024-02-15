import { ref, remove, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import { Game } from "@/lib/firebase/database";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
  const getID = Math.round(Math.random() * 100)

  console.log("Cleaning up lobbies...", getID);

  const cutOffTime = Date.now() - 1000 * 60 * 60 * 3; // 3 hours ago
  const gamesRef = ref(db, 'games');

  console.log("Getting games...", getID);

  await get(gamesRef).then((snapshot) => {
    console.log("Data read successfully", getID, snapshot.val());

    for (const [gameId, game] of Object.entries<Game>(snapshot.val())) {
      if (game.lastMoveTime < cutOffTime) {
        console.log(`Game ${gameId} is too old and will be removed.`, getID);
        remove(ref(db, `games/${gameId}`)).catch((error) => {
          console.error("Error deleting game", gameId, getID, error);
        });
      }
    }
  }).catch((error) => {
    console.error("Error reading data", getID, error);
  });

  return new Response("Lobbies cleaned up.");
}