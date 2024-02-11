import Image from "next/image";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import Create from "@/components/game/Create";

export default function Home() {
  return (
    <main>
      <h1>
        Nextjs Firebase Game
      </h1>
      <Create />
    </main>
  );
}
