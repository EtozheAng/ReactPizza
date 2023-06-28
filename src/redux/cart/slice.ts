import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartSliceState, TCartItem } from './types'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

const { totalPrice, items } = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
  items,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )
      if (findItem) {
        findItem.count--
        state.totalPrice = calcTotalPrice(state.items)
        state.items = state.items.filter((obj) => obj.count !== 0)
      }
    },
    removeItem(state, action: PayloadAction<TCartItem>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      )
      state.totalPrice = calcTotalPrice(state.items)
    },

    clearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions

export default cartSlice.reducer
