export type TCartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export interface CartSliceState {
  totalPrice: number
  items: TCartItem[]
}
