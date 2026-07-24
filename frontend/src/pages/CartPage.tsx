import { Trash2 } from "lucide-react";
import {
  addToCart,
  removeFromCart,
  type CartItem,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice, shippingCharge, taxPrice, totalItems } =
    useSelector((state: any) => state.cart);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="rounded-lg border p-10 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item: CartItem) => (
              <div
                key={item._id}
                className="flex gap-5 rounded-xl border bg-white p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 rounded-lg object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </p>

                    <p className="mt-3 font-semibold text-green-600">
                      ${item.price}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {item.quantity == 0 ? (
                        item.quantity
                      ) : (
                        <div className="flex items-center">
                          <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="h-10 w-10 rounded-l-lg border border-gray-300 hover:bg-gray-100"
                          >
                            -
                          </button>

                          <span className="flex h-10 w-12 items-center justify-center border-y border-gray-300">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className="h-10 w-10 rounded-r-lg border border-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </span>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="rounded-md p-2 text-red-500 transition hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

          <div className="mb-4 flex justify-between">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Shipping Price</span>
            <span>${shippingCharge}</span>
          </div>

          <div className="mb-4 flex justify-between text-sm text-gray-600">
            <span>Tax Price</span>
            <span>${taxPrice}</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-bold mb-3">
            <span>Total Price</span>
            <span>${totalPrice}</span>
          </div>

          <button className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
