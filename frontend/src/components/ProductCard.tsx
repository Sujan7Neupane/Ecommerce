import { Link } from "react-router";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="  border-gray-200 bg-white shadow-lg overflow-hidden rounded-xl border transition duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />

        <div className="space-y-3 p-4">
          <h2 className="line-clamp-1 text-lg font-semibold text-gray-800">
            {product.name}
          </h2>

          <p className="line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{product.averageRating}</span>
            <span>{product.numReviews} reviews</span>
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

          <button className="w-full rounded-lg bg-gray-900 py-2 text-sm font-medium text-white transition hover:bg-gray-700 cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
