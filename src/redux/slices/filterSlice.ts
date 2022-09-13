import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
  name: string;
  sortProperty: 'title' | 'rating' | 'price';
  type: string;
}

interface StateProps {
  categoryId: number;
  sortType: Sort;
  page: number;
  searchValue: string
}

const initialState: StateProps = {
  categoryId: 0,
  sortType: {name: 'популярности(ASC)', sortProperty: 'rating', type: 'asc'},
  page: 1,
  searchValue: ''
}

export const filterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action) => {
      state.sortType = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId)
      state.page = Number(action.payload.page)
      state.searchValue = action.payload.searchValue
      state.sortType = {
        name: action.payload.sortType.name,
        sortProperty: action.payload.sortType.sortProperty,
        type: action.payload.sortType.type
      }
     
      
    }
  },
})

export const sortSelector = (state: RootState) => state.filter.sortType

export const searchSelector = (state: RootState) => state.filter.searchValue

export const { setCategoryId, setSortType, setPage,setSearchValue ,setFilters } = filterSlice.actions

export default filterSlice.reducer