//SSR을 사용해서 서버에서 지정한 추천 상품을 전시합니다.
import ItemCard from '@/app/components/common/ItemCard'
import '@/styles/NotableItems.css'
export default async function NotableItems({ src }: { src: string }) {
  //서버에서 렌더링하는 패칭 요소임으로 JavaScript Fetching을 이용합니다.
  const res = await fetch(src)
  const json = await res.json()
  const notableItems = []
  for (let i = 0; i < 6; i++) {
    notableItems.push(
      <ItemCard
        id={json[i].id}
        title={json[i].title}
        desc={json[i].description}
        category={json[i].category}
        image={json[i].image}
        rating={json[i].rating}
      />,
    )
  }
  return (
    <>
      <h1 className={'text-2xl'}>{'Notable Items'}</h1>
      <div className={'cust-notable-items'}>{notableItems}</div>
    </>
  )
}
