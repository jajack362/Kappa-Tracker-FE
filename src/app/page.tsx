import Navbar from "@/components/Navbar";
import Columns from "@/components/Columns";

export default function Home() {
  return (
      <>
        <Navbar />
        <main className="flex flex-col items-center justify-center text-center px-4 bg-background text-primary">
          <Columns />
        </main>
      </>
  )
}
