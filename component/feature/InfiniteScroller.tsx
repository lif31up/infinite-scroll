'use client'
import React from 'react'
import { MutableRefObject, useEffect, useRef } from 'react'
import { Default } from '@/util/interface'

const id: string = 'infinite-scroller--0'
interface IntersectionListener extends Default {
  indexHandler: () => void
}
function InfiniteScroller({
  indexHandler,
  className,
}: IntersectionListener): React.JSX.Element {
  const observerRef: MutableRefObject<IntersectionObserver | null> =
    useRef(null)
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
  return <div className={`w-fill h-4 bg-black ${className}`} id={id} />
}
export default InfiniteScroller
