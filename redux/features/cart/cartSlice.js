import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cart = state.cart.filter(item => item.id !== itemIdToRemove);
    },
    dropCart: (state) => {
      state.cart = []
    }
  }
})

export const { addToCart, removeFromCart, dropCart } = cartSlice.actions

export default cartSlice.reducer