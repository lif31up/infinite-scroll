import NotableItems from "@/app/components/feature/NotableItems";
import RQIS from "@/app/components/feature/RQIS";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NotableItems src={"https://fakestoreapi.com/products"}/>
      <RQIS src={"https://fakestoreapi.com/products"}/>
    </main>
  )
}
