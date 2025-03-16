import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/entities/cart";
import { filtersReducer, productsApi } from "@/entities/product";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const makeStore = () => 
    configureStore({
        reducer: {
            cart: cartReducer,
            filters: filtersReducer,
            [productsApi.reducerPath]: productsApi.reducer,
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(productsApi.middleware);
        },
    });

type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();