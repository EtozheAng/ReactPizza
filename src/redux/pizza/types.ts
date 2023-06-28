export type SearchPizzaParams = {
  currentPage: string
  category: string
  sortBy: string
  order: string
  search: string
}

export type Pizza = {
  id: string
  name: string
  price: number
  imageUrl: string
  type: number
  size: number
  count: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface pizzaSliceState {
  items: Pizza[]
  status: Status
}
