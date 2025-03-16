import { Button, ListItem } from "@mui/material";
import { Product } from "../../types";
import classes from './listItem.module.scss'
import { useTypedDispatch, useTypedSelector } from "@/app/store";
import { addItem, removeItem } from "@/entities/cart";
import { Counter } from "@/shared/counter";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";


export function ProductListItem(product: Product){
    const cart_items = useTypedSelector(state => state.cart.items);
    const dispatch = useTypedDispatch();

    const count = cart_items[product.id]?.count || 0;

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addItem({item: product, count: 1}));
    }

    const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(removeItem({item: product, count: 1}));
    }

    return (
        <ListItem>
            <Link href={`/product/${product.id}`}>
                <div className={classes.listItem}>
                    <h2 className={classes.listItem__title}>
                        {product.name}
                    </h2>
                    <span className={classes.listItem__price}>{product.price} ₽</span>
                    <span className={classes.listItem__brand}>{product.brand}</span>
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
                </div>
            </Link>
        </ListItem>
    )
}