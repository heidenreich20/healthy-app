import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import themeReducer from "./features/theme/themeSlice"
import searchReducer from "./features/search/searchSlice"
import ordersReducer from "./features/orders/orderSlice"
import categoriesReducer from "./features/categories/categoriesSlice"
import loadingSlice from './features/loading/loadingSlice'
export default configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    search: searchReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    loading: loadingSlice
  }
})