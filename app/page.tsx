import InfiniteTable from '@/component/feature/InfiniteTable'
import React from 'react'
import Link from 'next/link'

export default function Home(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <header className="my-20 w-3/4 bg-white px-8 py-12 rounded-2xl shadow">
        <h2 className="text-sm font-extrabold text-neutral-500 tracking-widest">
          InfiniteTable.tsx, InfiniteScroller
        </h2>
        <h1 className="text-2xl font-bold text-gray-800 select-none">
          ReactQuery, Observer API, React Hook를 통해 안정적인 무한 스크롤러를
          구현했습니다.
        </h1>
        <p className="text-base text-neutral-600 mt-2 mb-12">
          FakeStore API란 오픈소스 서버에서 아이템을 요청해 전시합니다.
        </p>
        <Link
          href="https://github.com/lif31up/infinite-scroll"
          className="px-4 py-4 bg-emerald-300 rounded text-white font-bold"
        >
          코드를 확인하세요
        </Link>
      </header>
      <InfiniteTable
        src={'https://fakestoreapi.com/products'}
        className="mt-8"
      />
    </main>
  )
}
