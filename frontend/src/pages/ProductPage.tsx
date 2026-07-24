import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/slices/productApiSlice";
// import { products } from "../data/product";
import type { Product } from "../types/product";

const ProductPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // console.log(products);

  // console.log(Array.isArray(products));

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error?.data?.error || error?.error}</h1>
      ) : (
        <div className="mx-auto max-w-7xl p-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.products?.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
