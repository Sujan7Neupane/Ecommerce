import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slices/cartSlice";
import apiSlice from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
