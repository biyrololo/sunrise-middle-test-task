import { Product } from "@/entities/product"

export type CartItem = {
    item: Product
    count: number
}

export type Cart = {
    items: {
        [key: number]: CartItem
    }
    total: number;
    count: number;
}