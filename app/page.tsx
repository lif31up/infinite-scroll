import NotableItems from "@/app/components/feature/NotableItems";
import InfiniteScrollTable from "@/app/components/feature/InfiniteScrollering";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NotableItems src={"https://fakestoreapi.com/products"}/>
      <div className={"h-80"}></div>
      <InfiniteScrollTable src={"https://fakestoreapi.com/products"} index={1}/>
    </main>
  )
}
