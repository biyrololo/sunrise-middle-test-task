"use client"

import { useGetProductByIdQuery } from "@/entities/product";
import { useTypedDispatch, useTypedSelector } from "@/app/store";
import { Counter } from "@/shared/counter";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import { addItem, removeItem } from "@/entities/cart";
import classes from './product.module.scss'
import { useEffect } from "react";
import { useParams } from "next/navigation";

export function Product(){
    const id = Number(useParams()?.id);
    const {data: product, isLoading, isError} = useGetProductByIdQuery(id);
    const cart_items = useTypedSelector(state => state.cart.items);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if(!product) {
            return;
        }
        document.title = `${product?.name} | Next Shop`;
    }, [product]);

    if(isLoading) {
        return <h1 className={classes.message}>Загрузка...</h1>
    }

    if(isError || !product) {
        return <h1 className={classes.message}>Товар не найден</h1>
    }

    const count = cart_items[product.id]?.count || 0;

    const handleAddToCart = () => {
        dispatch(addItem({item: product, count: 1}));
    }

    const handleRemoveFromCart = () => {
        dispatch(removeItem({item: product, count: 1}));
    }

    return (
        <section className={classes.product}>
            <h2 className={classes.product__title}>
                {product.name}
            </h2>
            <span className={classes.product__price}>{product.price} ₽</span>
            <span className={classes.product__brand}>{product.brand}</span>
            <p className={classes.product__description}>{product.description}</p>
            {
                count ? (
                    <Counter
                        value={count}
                        onIncrement={handleAddToCart}
                        onDecrement={handleRemoveFromCart}
                    />
                ) :
                (
                    <Button
                        onClick={handleAddToCart}
                        variant="contained"
                        sx={{width: 'fit-content'}}
                        endIcon={<ShoppingCartIcon />}
                    >
                        Добавить в корзину
                    </Button>
                )
            }
        </section>
    )
}