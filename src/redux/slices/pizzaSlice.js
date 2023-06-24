import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  status: 'loading',
}
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params
    const { data } = await axios.get(
      `https://64843ff7ee799e3216266cf1.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
    )
    return data
  }
)
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading'
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error'
        state.items = []
      })
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
