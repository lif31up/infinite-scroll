import Image from 'next/image'
import { ReactNode } from 'react'
import '@/styles/ItemCard.css'
import { Default, Item, TailwindProperties } from '@/app/components/interface'

export interface ItemCard extends Default {
  data: Item
}

const style: TailwindProperties = {
  lg: 'lg:flex lg:bg-gray',
  md: 'md:flex md:bg-white',
}

export default function ItemCard({ data, className }: ItemCard) {
  const { id, title, description, image, rating } = data
  console.log(title)
  return (
    <div className={`w-full h-fit ${style.lg} ${style.md} ${className}`}>
      <Image width={160} height={160} alt="image" src={image} />
      <h1>{title}</h1>
      <span>{id}</span>
    </div>
  )
}
interface RatingProps {
  rate: number
  count: number
}
function RatingStar({ rate, count }: RatingProps) {
  const stars: Array<ReactNode> = []
  for (let i = 0; i < rate; i++) {
    stars.push(<div className={'cust-star'}>O</div>)
  }
  return <div className={'flex gap-1'}>{stars}</div>
}
