import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Pizza, SearchPizzaParams } from './types'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params
    const { data } = await axios.get<Pizza[]>(
      `https://64843ff7ee799e3216266cf1.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
    )
    return data
  }
)
