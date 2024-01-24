import InfiniteTable from '@/component/feature/InfiniteTable'
import { Default, TailwindProperties } from '@/util/interface'

function ScrollerSection({ className }: Default) {
  const style: TailwindProperties = {
    sm: 'sm:px-80',
    base: 'px-6',
  }
  return (
    <section className={`${style.sm} ${style.base} ${className}`}>
      <header>
        <h2 className="text-sm font-bold text-neutral-500 mt-8">
          InfiniteScroller.tsx, InfiniteTable.tsx
        </h2>
        <h1 className="text-5xl font-bold text-gray-800">
          무한 스크롤러와 무한 테이블
        </h1>
        <p className="text-base font-normal text-neutral-800 mt-2">
          스크롤을 할 때마다 하나씩 새로운 아이템에 대한 정보가 패칭되고 이가
          반영됩니다.
        </p>
      </header>
      <InfiniteTable
        src={'https://fakestoreapi.com/products'}
        className="mt-8"
      />
    </section>
  )
}

export default ScrollerSection
