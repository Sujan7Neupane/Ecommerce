import { createSlice, current } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

export interface CartItem {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  itemPrice: number;
  shippingCharge: number;
  taxPrice: number;
  totalPrice: number;
  totalItems: number;
}

const initialState: CartState = {
  cartItems: [],
  itemPrice: 0,
  shippingCharge: 0,
  taxPrice: 0,
  totalPrice: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(current(state));

      const item = action.payload;

      // console.log(item);

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id,
      );

      // console.log(current(existingItem));
      // console.log(current(state));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }

      console.log(current(state.cartItems));

      // comes from the utils file
      // reason: repetation in addToCart and rmvFromCart
      updateCart(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.cartItems.find((item) => item._id === id);

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
      }

      // comes from the utils file
      // reason: repetation in addToCart and rmvFromCart
      updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
