import Image from "next/image";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import Create from "@/components/game/Create";
import PageLayout from "@/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <h1>
        Tic Tac Joe
      </h1>
      <Create />
    </PageLayout>
  );
}
