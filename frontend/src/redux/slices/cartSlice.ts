import { createSlice, current } from "@reduxjs/toolkit";

export interface CartItem {
  _id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // console.log(item);

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id,
      );

      // console.log(current(existingItem));
      // console.log(current(state));

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + item.quantity; //existing + new qunatity
      } else {
        state.cartItems.push(item);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
