import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products.json'
        }),
        getProductById: builder.query<Product, number>({
            query: () => `/products.json`,
            transformResponse: (response: Product[], _, arg) => {
                const product = response.find(item => item.id === arg);
                if(!product) {
                    throw new Error('Product not found');
                }
                return product
            }
        })
    })
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;