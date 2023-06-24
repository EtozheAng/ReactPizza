import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
      state.totalPrice = calculateTotalPrice(state.items)
    },
    minusItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )
      if (findItem) {
        findItem.count--
        state.totalPrice = calculateTotalPrice(state.items)
        state.items = state.items.filter((obj) => obj.count !== 0)
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      )
      state.totalPrice = calculateTotalPrice(state.items)
    },

    clearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})
function calculateTotalPrice(items) {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) =>
  state.cart.items
    .filter((obj) => obj.id === id)
    .reduce((sum, obj) => sum + obj.count, 0)

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions

export default cartSlice.reducer
