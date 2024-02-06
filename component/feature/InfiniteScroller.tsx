'use client'
import React from 'react'
import { MutableRefObject, useEffect, useRef } from 'react'
import { Default } from '@/utils/interface'

interface IntersectionListener extends Default {
  indexHandler: () => void
}
function InfiniteScroller({
  indexHandler,
  className,
}: IntersectionListener): React.JSX.Element {
  const observerRef: MutableRefObject<IntersectionObserver | null> =
    useRef(null)
  const id: string = 'infinite-scroller--0'
  const options: object = { root: null, rootMargin: '0px', threshold: 1 }
  useEffect((): void => {
    const target: HTMLElement | null = document.getElementById(id)
    if (!target) return
    const intersectionHandler = (
      entries: Array<IntersectionObserverEntry>
    ): void => {
      entries.forEach(
        (entry: IntersectionObserverEntry): void | (() => void) => {
          if (entry.isIntersecting) {
            if (observerRef.current) observerRef.current.disconnect()
            indexHandler()
          }
        }
      )
    }
    observerRef.current = new IntersectionObserver(intersectionHandler, options)
    if (!observerRef.current) return
    observerRef.current.observe(target)
  }, [indexHandler])
  return (
    <>
      <div
        className={`w-full h-6 bg-green-400 rounded-2xl text-center text-white font-bold pt-1 mb-8 ${className}`}
        id={id}
      />
      <h1>더 이상 불러올 상품이 없습니다.</h1>
    </>
  )
}
export default InfiniteScroller
