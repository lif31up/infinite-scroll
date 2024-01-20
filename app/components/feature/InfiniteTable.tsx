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
export let lastIndex = 1

function Table({ src }: { src: string }) {
  const [change, setChange]: [
    change: boolean,
    setChange: React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false)
  const stackRef: MutableRefObject<Array<React.ReactNode>> = useRef([])
  const checkRef: MutableRefObject<Array<number>> = useRef([0])

  useQuery(['data', src, lastIndex], () => fetcher(src, lastIndex), {
    onSuccess: (data: Item): void | undefined => {
      if (checkRef.current.includes(data.id)) return
      checkRef.current.push(data.id)
      stackRef.current.push(<ItemCard key={lastIndex} data={data} />)
      const buffer: boolean = !change
      setChange(buffer)
    },
    onError: (error: Error): void => {
      console.warn(error.message)
      const buffer: boolean = !change
      setChange(buffer)
    },
    staleTime: 1000,
  })

  const indexHandler = useCallback((): void => {
    lastIndex++
  }, [change])

  return (
    <div className={'w-full grid'}>
      <>{stackRef.current}</>
      <InfiniteScroller indexHandler={indexHandler} />
    </div>
  )
}
