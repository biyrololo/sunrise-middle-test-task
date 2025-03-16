"use client";

import { useTypedSelector } from "@/app/store";
import { ProductListItem, useGetProductsQuery } from "@/entities/product";
import { Button, ButtonGroup, List } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import classes from './products.module.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const limit = 10;
export function Products() {
    const [page, setPage] = useState(0);
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const parameters = useTypedSelector(state => state.filters);

    useEffect(() => {
        setPage(0);
    }, [parameters]);

    const filteredSortedProducts = useMemo(() => {
        if(!products) {
            return products;
        }
        return products
        .filter(product => (
            parameters.price[0] <= product.price && product.price <= parameters.price[1] &&
            (parameters.isNew ? product.isNew : true)
        ))
        .sort((a, b) => {
            if(parameters.sort.order === 'asc') {
                return a[parameters.sort.name] > b[parameters.sort.name] ? 1 : -1;
            } else {
                return a[parameters.sort.name] < b[parameters.sort.name] ? 1 : -1;
            }
        })
    }, [products, parameters, page]);

    if(isLoading) {
        return <div className={classes.message}>Загрузка...</div>
    }

    if(isError || !filteredSortedProducts) {
        return <div className={classes.message}>Error</div>
    }

    if(!filteredSortedProducts.length) {
        return (
            <div className={classes.message}>
                Товары не найдены
            </div>
        )
    }

    const maxPage = Math.ceil(filteredSortedProducts!.length / limit) - 1;

    return (
        <div>
            <List>
                {filteredSortedProducts
                .slice(page * limit, (page + 1) * limit)
                .map(product => (
                    <ProductListItem key={product.id} 
                    {...product} 
                    />
                ))}
            </List>
            <ButtonGroup>
                <Button sx={{paddingInlineEnd: 0}} startIcon={<ChevronLeftIcon />} disabled={page === 0} onClick={() => setPage(prev => prev - 1)}></Button>
                {
                    page !== 0 && <Button onClick={() => setPage(0)}>1</Button>
                }
                {
                    page === maxPage && maxPage > 1 &&
                    <Button disableTouchRipple>...</Button>
                }
                <Button disableTouchRipple>{page + 1}</Button>
                {
                    page === 0 && maxPage > 1 &&
                    <Button disableTouchRipple>...</Button>
                }
                {
                    maxPage > 0 && page !== maxPage && <Button onClick={() => setPage(maxPage)}>{maxPage + 1}</Button>
                }
                <Button sx={{paddingInlineStart: 0}} endIcon={<ChevronRightIcon />} disabled={page === maxPage} onClick={() => setPage(prev => prev+1)}></Button>
            </ButtonGroup>
        </div>
    );
}