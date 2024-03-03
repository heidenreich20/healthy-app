import { createSlice } from "@reduxjs/toolkit"

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: null
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
})

export const { setOrders } = ordersSlice.actions

export default ordersSlice.reducer