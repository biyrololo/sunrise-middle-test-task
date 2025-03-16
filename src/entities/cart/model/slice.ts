import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../types";

const initialState: Cart = {
    items: [],
    total: 0,
    count: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.count++;
            state.total += action.payload.item.price;
            if(state.items[action.payload.item.id]) {
                state.items[action.payload.item.id].count++;
            } else {
                state.items[action.payload.item.id] = action.payload;
            }
        },
        removeItem: (state, action: PayloadAction<CartItem>) => {
            state.count--;
            state.total -= action.payload.item.price;
            if(state.items[action.payload.item.id]) {
                if(state.items[action.payload.item.id].count > 1) {
                    state.items[action.payload.item.id].count--;
                } else {
                    delete state.items[action.payload.item.id];
                }
            }
        },
        clearCart: (state) => {
            state.items = {};
            state.total = 0;
            state.count = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;