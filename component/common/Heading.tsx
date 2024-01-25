import React from 'react'
import { Default } from '@/util/interface'
import TailwindProperties from '@/util/TailwindProperties'
interface Data {
  filename: string
  title: string
  desc: string
  href: string
}
interface Heading extends Default {
  data: Data
}
function Heading({ className, data }: Heading) {
  const { filename, title, desc, href }: Data = data
  const style: TailwindProperties = {
    sm: 'sm:my-16 sm:bg-neutral-100 p-4 sm:shadow sm:relative',
    base: 'bg-neutral-100 shadow relative',
  }
  return (
    <section className={`${style.sm} ${style.base} ${className}`}>
      <h2 className="text-sm font-bold text-neutral-700">{filename}</h2>
      <h1 className="text-3xl font-bold text-gray-800 mt-8">{title}</h1>
      <p className="text-sm font-medium text-neutral-900 mt-2">{desc}</p>
      <a href={href} className="sm:absolute sm:top-0 sm:right-0">
        <h1 className="w-fit py-4 px-4 text-white font-bold bg-green-400 rounded-2xl shadow sm:m-4 mt-8">
          리포지토리로 이동
        </h1>
      </a>
    </section>
  )
}
export default Heading
