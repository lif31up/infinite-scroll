import InfiniteTable from '@/component/feature/InfiniteTable'
import { Default } from '@/utils/propsInterface'
import TailwindProperties from '@/styles/tailwindProperties'
import Heading from '@/component/common/Heading'

function ScrollerSection({ className }: Default) {
  const style: TailwindProperties = {
    sm: 'sm:px-80',
    base: 'px-6',
  }
  return (
    <section className={`${style.sm} ${style.base} ${className}`}>
      <Heading
        data={{
          filename: 'InfiniteTable.tsx, InfiniteScroller,tsx',
          title: '무한 스크롤러',
          desc: '리액트 후크를 이용해서 무한 스크롤러를 구현했습니다.',
          href: 'https://github.com/lif31up/infinite-scroll',
        }}
        className="mt-4"
      />
      <InfiniteTable
        src={'https://fakestoreapi.com/products'}
        className="mt-8"
      />
    </section>
  )
}

export default ScrollerSection
