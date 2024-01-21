'use client'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { MutableRefObject, useCallback, useRef, useState } from 'react'
import InfiniteScroller from '@/app/components/feature/InfiniteScroller'
import { Item } from '@/app/components/interface'
import ItemCard from '@/app/components/common/ItemCard'

const fetcher = async (endpoint: string, index: number): Promise<any> => {
  try {
    const response: Response = await fetch(`${endpoint}/${index}`)
    return await response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

const queryClient: QueryClient = new QueryClient()
export default function InfiniteTable({ src }: { src: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Table src={src} />
    </QueryClientProvider>
  )
}

function Table({ src }: { src: string }) {
  const [index, setIndex]: [
    change: number,
    setChange: React.Dispatch<React.SetStateAction<number>>
  ] = useState(1)
  const stackRef: MutableRefObject<Array<React.JSX.Element>> = useRef([])
  const checkRef: MutableRefObject<Array<number>> = useRef([0])

  useQuery(['fakestore', src, index], () => fetcher(src, index), {
    onSuccess: (data: Item): void | undefined => {
      const buffer: number = index + 1
      if (checkRef.current.includes(data.id)) setIndex(buffer)
      checkRef.current.push(data.id)
      stackRef.current.push(<ItemCard key={data.id} data={data} />)
      setIndex(buffer)
    },
    onError: (error: Error): void => {
      const buffer: number = index + 1
      setIndex(buffer)
    },
    staleTime: 1000,
  })

  const indexHandler = useCallback((): void => {
    console.log(index)
    if (index === 0) return
    const buffer: number = index + 1
    setIndex(buffer)
  }, [index])

  return (
    <div className={'w-full grid'}>
      <section>{stackRef.current}</section>
      <InfiniteScroller indexHandler={indexHandler} />
    </div>
  )
}
