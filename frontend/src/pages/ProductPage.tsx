import ProductCard from "../components/ProductCard";
import { products } from "../data/product";

import type { Product } from "../types/product";

const ProductPage = () => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
