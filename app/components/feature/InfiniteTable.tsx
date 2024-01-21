'use client'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { MutableRefObject, useCallback, useRef, useState } from 'react'
import InfiniteScroller from '@/app/components/feature/InfiniteScroller'
import { Default, Item, TailwindProperties } from '@/app/components/interface'
import ItemCard from '@/app/components/common/ItemCard'

const fetcher = async (
  endpoint: string,
  index: number
): Promise<Response | void> => {
  try {
    const response: Response = await fetch(`${endpoint}/${index}`)
    return await response.json()
  } catch (error) {
    console.warn(error)
  }
}

interface InfiniteTable extends Default {
  src: string
}
const queryClient: QueryClient = new QueryClient()
export default function InfiniteTable({ src, className }: InfiniteTable) {
  return (
    <QueryClientProvider client={queryClient}>
      <Table src={src} className={className} />
    </QueryClientProvider>
  )
}

interface Table extends Default {
  src: string
}
let indexHandler: any = (): void => {}
function Table({ src, className }: Table) {
  const [index, setIndex]: [
    change: number,
    setChange: React.Dispatch<React.SetStateAction<number>>
  ] = useState(1)
  const stackRef: MutableRefObject<Array<React.JSX.Element>> = useRef([])
  const checkRef: MutableRefObject<Array<number>> = useRef([0])

  const buffer: number = index + 1
  useQuery(['fakestore', src, index], () => fetcher(src, index), {
    onSuccess: (data: Item): void | (() => void) => {
      if (!data) return
      if (checkRef.current.includes(data.id)) {
      } else {
        checkRef.current.push(data.id)
        stackRef.current.push(<ItemCard key={data.id} data={data} />)
      }
      indexHandler = (): void => {
        setIndex(buffer)
      }
    },
    onError: (error: Error): void => {
      setIndex(buffer)
    },
    staleTime: 1000,
  })

  return (
    <section className={`${style.lg} ${style.md} ${className}`}>
      <ul className="grid gap-8">{stackRef.current}</ul>
      <InfiniteScroller indexHandler={indexHandler} className="mt-8" />
    </section>
  )
}
const style: TailwindProperties = {
  lg: 'lg:px-60',
  md: 'md:px-4',
}
