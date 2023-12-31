import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, sortPropertyEnum } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 1,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: sortPropertyEnum.RATING_DESC },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort
        state.categoryId = Number(action.payload.categoryId)
        state.currentPage = Number(action.payload.currentPage)
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'популярности',
          sortProperty: sortPropertyEnum.RATING_DESC,
        }
      }
    },
  },
})
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
