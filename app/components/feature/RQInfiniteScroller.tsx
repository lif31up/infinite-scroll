'use client'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { MutableRefObject, useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import '@/styles/RQIS.css'
import IntersectionListener from '@/app/components/feature/IntersectionListener'
import { FakeStoreProduct } from '@/app/components/feature/FetchingDataType'
const queryClient = new QueryClient()
export default function RQInfiniteScroller({ src }: { src: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InfiniteScroller src={src} />
    </QueryClientProvider>
  )
}
const fetcher = async (
  endpoint: string,
  index: number,
): Promise<object | boolean> => {
  if (index === 0) {
    let serverStatus = false
    const serverRes = await fetch(endpoint)
    if (serverRes.ok) {
      serverStatus = true
    }
    return serverStatus
  }
  try {
    const response = await fetch([endpoint, index].join('/').trim())
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return false
  }
}
function InfiniteScroller({ src }: { src: string }) {
  const [latestIndex, setLatestIndex] = useState(0)
  const [change, setChange] = useState(false)
  const queryStackRef: MutableRefObject<Array<React.ReactNode>> = useRef([])
  const checkerRef: MutableRefObject<Array<string>> = useRef([])
  const [error, setError] = useState(false)
  const {
    data,
    isLoading,
    isError,
  }: { data: any; isLoading: boolean; isError: boolean } = useQuery(
    ['data', src, latestIndex],
    () => fetcher(src, latestIndex),
    {
      onSuccess: (data: any) => {
        if (!data) {
          return () => {
            setError(true)
          }
        }
        let id = data.id
        if (
          checkerRef.current.some((element) => {
            return element === id
          })
        ) {
          console.warn('fetched element already exists in stack.')
        } else {
          checkerRef.current.push(id)
          queryStackRef.current.push(
            <RQIS_ItemCard key={latestIndex} data={data} />,
          )
        } //if else
        setChange(!change)
        return 0
      },
      onError: (error: Error) => {
        console.warn(error.message)
      },
      staleTime: 0,
    },
  )
  const loadMore = useCallback(async () => {
    const new_latestIndex = latestIndex + 1
    setLatestIndex(new_latestIndex)
  }, [change])
  if (error) {
    window.location.reload()
  }
  return (
    <div className={'custom-RQIS'}>
      <div>{queryStackRef.current}</div>
      <IntersectionListener loadMore={loadMore} />
    </div>
  )
}
function RQIS_ItemCard({ data }: { data: FakeStoreProduct }) {
  return (
    <div className={'custom-RQIS-item-card'}>
      <div className={'w-40 h-40 relative object-cover'}>
        <Image
          src={data.image}
          alt={data.title}
          width={'0'}
          height={'0'}
          sizes={'150px'}
          className={'w-full h-full'}
        />
      </div>
      <div>
        <h1>{data.title}</h1>
        <p>{data.price.toString()}</p>
      </div>
    </div>
  )
}
