import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductSort } from "../types";

type FiltersState = {
    sort: {
        name: ProductSort;
        order: "asc" | "desc";
    };
    price: [number, number];
    isNew: boolean;
}

const initialState: FiltersState = {
    sort: {
        name: 'name',
        order: 'asc',
    },
    price: [0, 300_000],
    isNew: false
};

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<FiltersState['sort']>) => {
            state.sort = action.payload;
        },
        setPrice: (state, action: PayloadAction<FiltersState['price']>) => {
            state.price = action.payload;
        },
        setIsNew: (state, action: PayloadAction<boolean>) => {
            state.isNew = action.payload;
        },
    },
});

export const { setSort, setPrice, setIsNew } = filtersSlice.actions;
export default filtersSlice.reducer;