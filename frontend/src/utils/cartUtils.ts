// this same thing repated in addToCart and removeFromCart reducers
// so making it seperate and dynamic

import type { CartState } from "../redux/slices/cartSlice";

function updateCart(state: CartState) {
  // adding extra fields to an array like totalPricem shipping price etc
  state.totalItems = state.cartItems.reduce(
    (total, item) => total + item.quantity, //total items in cart(along with qty)
    0,
  );

  state.itemPrice = Number(
    state.cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2),
  );

  state.shippingCharge =
    state.itemPrice === 0 ? 0 : state.itemPrice >= 100 ? 0 : 10;
  state.taxPrice = Number((state.itemPrice * 0.1).toFixed(2));
  state.totalPrice = Number(
    (state.itemPrice + state.shippingCharge + state.taxPrice).toFixed(2),
  );
}

export { updateCart };
