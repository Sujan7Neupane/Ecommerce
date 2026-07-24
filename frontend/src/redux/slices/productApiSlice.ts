import { PRODUCT_URL } from "../../constants";
import apiSlice from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}`,
      }),

      keepUnusedDataFor: 5,
    }),

    getProductById: builder.query({
      query: (slug) => ({
        url: `${PRODUCT_URL}/${slug}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;
