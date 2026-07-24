import { Link } from "react-router";
import type { Product } from "../types/product";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  type CartItem,
} from "../redux/slices/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // console.log(product);

  const existingItem = useSelector((state: any) =>
    state.cart.cartItems.find((item: CartItem) => item._id === product._id),
  );

  // console.log(existingItem);

  const dispatch = useDispatch();
  return (
    <div className="  border-gray-200 bg-white shadow-lg overflow-hidden rounded-xl border transition duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
      </Link>

      <div className="space-y-3 p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="line-clamp-1 text-lg font-semibold text-gray-800">
            {product.name}
          </h2>

          <p className="line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>
        </Link>

        <div className="flex text-sm">
          <Rating
            value={product.averageRating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.discountPrice}
            </span>

            {product.discountPrice < product.price && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {product.countInStock > 0
              ? `${product.countInStock} in stock`
              : "Out of stock"}
          </p>
        </div>

        {/* !existingItem = cart is empty */}
        {!existingItem || existingItem.quantity === 0 ? (
          <button
            disabled={product.countInStock === 0}
            onClick={() => dispatch(addToCart({ ...product }))}
            className={`w-full rounded-lg py-2 text-sm font-medium transition
            ${
              product.countInStock === 0
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "cursor-pointer bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
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
              disabled={existingItem.quantity >= product.countInStock}
              onClick={() => dispatch(addToCart({ ...product }))}
              className={`h-10 w-10 rounded-r-lg border border-gray-300 ${
                existingItem.quantity >= product.countInStock
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
