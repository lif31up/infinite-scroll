'use client'
import { MutableRefObject, useEffect, useRef } from 'react'
import { Default } from '@/app/components/interface'

const id: string = 'ifsc'
interface IntersectionListener extends Default {
  indexHandler: any
}
function InfiniteScroller({ indexHandler, className }: IntersectionListener) {
  const observerRef: MutableRefObject<IntersectionObserver | null> =
    useRef(null)
  const options: object = { root: null, rootMargin: '0px', threshold: 1 }
  useEffect((): void => {
    const target: HTMLElement | null = document.getElementById(id)
    if (!target) return
    const intersectionHandler = (entries: any): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting) indexHandler()
      })
    }
    observerRef.current = new IntersectionObserver(intersectionHandler, options)
    if (!observerRef.current) return
    observerRef.current.observe(target)
    observerRef.current.disconnect()
  }, [indexHandler])
  return <div className={`w-fill h-20 bg-black ${className}`} id={id} />
}
export default InfiniteScroller
