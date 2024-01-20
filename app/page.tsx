import InfiniteTable from '@/app/components/feature/InfiniteTable'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div style={{ height: '100vh' }}></div>
      <InfiniteTable src={'https://fakestoreapi.com/products'} />
    </main>
  )
}
