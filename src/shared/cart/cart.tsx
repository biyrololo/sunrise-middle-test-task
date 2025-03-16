"use client"

import { Badge, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTypedSelector } from '@/app/store';

export function Cart(){
    const count = useTypedSelector(state => state.cart.count);
    const total = useTypedSelector(state => state.cart.total);
    return (
        <>
            <Button
            variant='contained'
            sx={{px: 3, py: 2}}
            endIcon={
                <Badge badgeContent={count} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            }
            >
                Корзина
            </Button>
            <Typography sx={{minWidth: '80px'}}>{total}&nbsp;₽</Typography>
        </>
    )
}