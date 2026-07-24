import { useParams } from "react-router";
import Rating from "../components/Rating";
import { products } from "../data/product";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  type CartItem,
} from "../redux/slices/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log(quantity);

  // finding product
  const product = products.find((p) => p._id === Number(id));
  // console.log(product);

  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const existingItem = cartItems.find(
    (item: CartItem) => item._id === product?._id,
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">Product not found.</div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left - Product Image */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <img
            src={product.image}
            alt="Product"
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Middle - Product Details */}
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product?.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">{product?.category}</p>
          </div>

          <div className="border-y py-4">
            <Rating value={product?.averageRating} />
          </div>

          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-green-600">
              ${product.price}
            </p>
            {product.discountPrice < product.price && (
              <span className="text-xl text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>

            <p className="leading-7 text-gray-600">{product?.description}</p>
          </div>
        </div>

        {/* Right - Purchase Card */}
        <div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between border-b py-3">
              <span className="font-medium">Price</span>
              <span className="font-semibold">${product.price}</span>
            </div>

            <div className="flex justify-between border-b py-3">
              <span className="font-medium">Status</span>

              <span
                className={`font-semibold ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="font-medium">Shipping</span>
              <span>Free</span>
            </div>

            {/* Quantity dropdown button */}
            <div className="mt-4">
              <p className="mb-2 font-medium">Quantity</p>

              {!existingItem ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(removeFromCart(product._id))}
                    className="h-10 w-10 rounded-l-lg border border-gray-300 hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="flex h-10 w-12 items-center justify-center border-y border-gray-300">
                    {existingItem.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="h-10 w-10 rounded-r-lg border border-gray-300 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            <button className="mt-3 w-full rounded-lg border border-gray-300 py-3 transition hover:bg-gray-100">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
