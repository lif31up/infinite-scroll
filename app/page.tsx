import NotableItems from "@/app/components/feature/NotableItems";
import InfiniteScrollTable from "@/app/components/feature/InfiniteScrollering";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NotableItems src={"https://fakestoreapi.com/products"}/>
      <InfiniteScrollTable src={"https://fakestoreapi.com/products"}/>
    </main>
  )
}
