import Image from 'next/image'
import { Default, Item, TailwindProperties } from '@/util/interface'

export interface ItemCard extends Default {
  data: Item
}

const style: TailwindProperties = {
  lg: 'lg:flex lg:bg-white lg:p-4',
  md: 'md:flex md:bg-white md:p-4',
}

export default function ItemCard({ data, className }: ItemCard) {
  const { id, title, description, price, image, rating } = data
  return (
    <div
      className={`w-full h-fit shadow rounded-2xl ${style.lg} ${style.md} ${className}`}
    >
      <div className="flex-wrap h-40 w-40 relative">
        <Image sizes={`100px`} src={image} alt="image" fill />
      </div>
      <div className="w-full flex-wrap ml-4">
        <h1 className="text-2xl text-gray-700 font-bold">
          {title}
          <span className="text-xs ml-2">{id}</span>
        </h1>
        <h2 className="text-base font-extrabold text-neutral-900 mt-2">
          {'$ ' + price.toString()}
        </h2>
        <p className="text-md text-neutral-700 line-clamp-3">{description}</p>
        <RatingStar rate={rating.rate} count={rating.count} className="mt-2" />
      </div>
    </div>
  )
}
interface RatingStar extends Default {
  rate: number
  count: number
}
function RatingStar({ rate, count, className }: RatingStar) {
  const stars: Array<string> = []
  let i: number
  for (i = 0; i < rate; i++) {
    stars.push('★')
  }
  for (i; i < 5; i++) {
    stars.push('☆')
  }
  return (
    <div className={`${className}`}>
      {[stars.join(''), `(${count})`].join(' ')}
    </div>
  )
}
