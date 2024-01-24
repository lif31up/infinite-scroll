import InfiniteTable from '@/component/feature/InfiniteTable'
import React from 'react'
import { TailwindProperties } from '@/util/interface'
import ScrollerSection from '@/component/section/ScrollerSection'

export default function Home(): React.JSX.Element {
  const style: TailwindProperties = {
    sm: 'sm:px-80',
    base: '',
  }
  return (
    <main>
      <ScrollerSection />
    </main>
  )
}
