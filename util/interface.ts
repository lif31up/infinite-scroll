export interface Default {
  className?: string
  id?: string
  title?: string
}

export interface Item {
  id: number
  title: string
  price: number
  description: string
  image: string
  rating: { rate: number; count: number }
}
