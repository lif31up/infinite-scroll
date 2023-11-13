import NotableItems from "@/app/components/feature/NotableItems";
import RQInfiniteScroller from "@/app/components/feature/RQInfiniteScroller";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NotableItems src={"https://fakestoreapi.com/products"}/>
      <Link href={"https://github.com/lif31up/shopping-mall"}>{"리포지토리로 이동하기"}</Link>
      <Link href={"https://fakestoreapi.com"}>{"fakestoreapi 서버 상태 확인하기"}</Link>
      <RQInfiniteScroller src={"https://fakestoreapi.com/products"}/>
    </main>
  )
}
