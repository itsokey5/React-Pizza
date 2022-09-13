import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store';


export enum LoadingStatus{
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

type FetchProps = {
  searchValue: string,
  page: number,
  categoryId: number,
  sortType: {
    name: string;
    sortProperty: string;
    type: string;
  };
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({searchValue, page, categoryId, sortType}: FetchProps) => {
    const {data} = await axios.get(`https://6301ea7cc6dda4f287af2c08.mockapi.io/pizzas?${categoryId !== 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${sortType.type}
    ${searchValue ? `&search=${searchValue}` : ''}${page ? `&page=${page}&limit=4`: ''}`)
    
    return data as PizzaBlock[]
  }
)

type PizzaBlock = {
  
    id: string,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number 
}[]

interface PizzasState {
  items: PizzaBlock[],
  loading: boolean,
  loadingStatus: LoadingStatus
}

const initialState: PizzasState = {
  items: [],
  loading: true,
  loadingStatus: LoadingStatus.LOADING
}





export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loadingStatus = LoadingStatus.LOADING
    })
    
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.loadingStatus = LoadingStatus.SUCCESS

      state.items = action.payload
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.loadingStatus = LoadingStatus.ERROR

      state.items = []
    })
  },
})

export const cartSelector = (state: RootState) => state.cart;

export const { setItems, setLoading} = pizzasSlice.actions

export default pizzasSlice.reducer