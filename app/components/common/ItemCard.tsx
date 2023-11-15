import Image from 'next/image'
import { ReactNode } from 'react'
import '@/styles/ItemCard.css'
interface ItemCardProps {
  id: number
  title: string
  desc: string
  category: string
  image: string
  rating: RatingProps
}
export default function ItemCard({
  id,
  title,
  desc,
  category,
  image,
  rating,
}: ItemCardProps) {
  return (
    <div className={'custom-item-card'}>
      <div className={'w-full h-64 relative'}>
        <Image
          src={image}
          alt={title}
          layout={'fill'}
          objectPosition={'cover'}
          objectFit={'cover'}
        />
      </div>
      <div>
        <h1>{title}</h1>
        <h2>{category}</h2>
      </div>
      <RatingStar rate={rating.rate} count={rating.count} />
      <span>
        <p>{desc}</p>
      </span>
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
