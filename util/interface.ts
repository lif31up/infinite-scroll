export interface Default {
  className?: string
  id?: string
  title?: string
}

export interface TailwindProperties {
  xl?: string
  lg?: string
  sm?: string
  sm?: string
  base?: string
}

export interface Item {
  id: number
  title: string
  price: number
  description: string
  image: string
  rating: { rate: number; count: number }
}
