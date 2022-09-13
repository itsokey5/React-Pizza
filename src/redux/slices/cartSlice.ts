import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string ;
  size: number;
  count: number
}

interface cartSliceState {
    totalPrice: number;
    itemsLength: number;
    items: CartItem[]
}


const updateData = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) =>{
    return (obj.price * obj.count) + sum
  }, 0)
  state.itemsLength = state.items.reduce((sum, obj) =>{
    return (1 * obj.count) + sum
  }, 0)   
}

const initialState: cartSliceState = {
  totalPrice: 0,
  items: [],
  itemsLength: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    plusItem: (state, action) => {
      const setItem = state.items.find(obj => obj.id === action.payload.id);
      
      setItem.count++
      updateData(state)
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const setItem = state.items.find(obj => obj.id === action.payload.id);

      if(setItem){
       
        setItem.count ++
      } else {
        state.items.push({
          ...action.payload, count: 1
        })
      }
      updateData(state)
    },


    removeItem: (state, action) => {
      const setItem = state.items.find(obj => obj.id === action.payload.id);


      if(setItem){
        state.items = state.items.filter(obj => obj.id !== setItem.id )
        console.log(setItem.id)
      }

      updateData(state)
    },

    minusItem: (state, action) => {
      const setItem = state.items.find(obj => obj.id === action.payload.id);
      
      if(setItem.count > 1){
        setItem.count--
      } else {
        console.log('limit')
        // setItem.count--
        // state.items = state.items.filter(item => item.id !== setItem.id)
      }
      updateData(state)
      
  },
    clearItems: (state) => {
    state.items = []
    updateData(state)
 
 },

 loadItems: (state, action) => {
  state.items = action.payload
  updateData(state)

},

  
  },
})

export const {addItem,minusItem, clearItems, plusItem, removeItem, loadItems } = cartSlice.actions

export default cartSlice.reducer