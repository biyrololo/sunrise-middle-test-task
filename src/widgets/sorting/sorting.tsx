import { ProductSort } from '@/entities/product'
import classes from './sorting.module.scss'
import { useTypedSelector } from '@/app/store'
import { useDispatch } from 'react-redux';
import { setSort } from '@/entities/product';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button, Divider } from '@mui/material';
import React from 'react';

const sorting_labels: Record<ProductSort, string> = {
    name: 'Название',
    price: 'Цена',
    brand: 'Бренд',
}

export function Sorting() {
    const sort = useTypedSelector(state => state.filters.sort);
    const dispatch = useDispatch();

    const handleChangeSort = (value: ProductSort) => {
        if(sort.name === value) {
            dispatch(setSort({name: value, order: sort.order === 'asc' ? 'desc' : 'asc'}));
        } else {
            dispatch(setSort({name: value, order: 'asc'}));
        }
    }

    return (
        <section className={classes.sorting}>
            {
                Object.entries(sorting_labels).map(([key, label], index) => (
                    <React.Fragment key={key}>
                        <Button
                        endIcon={sort.name === key && (sort.order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                        onClick={() => handleChangeSort(key as ProductSort)}
                        >
                            {label}
                        </Button>
                        {
                            index !== Object.entries(sorting_labels).length - 1 && (
                                <Divider orientation="vertical" flexItem />
                            )
                        }
                    </React.Fragment>
                ))
            }
            
        </section>
    )
}