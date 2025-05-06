import Navbar from "@/components/Navbar";
import Columns from "@/components/Columns";
import {api} from "@/lib/api";

export default async function Home() {
    const tradersWithQuestItems = await api.fetchTraderQuestItems();

    return (
      <>
        <Navbar />
        <main className="flex flex-col items-center justify-center text-center px-4 bg-background text-primary">
          <Columns tradersWithQuestItems = {tradersWithQuestItems}/>
        </main>
      </>
  )
}
