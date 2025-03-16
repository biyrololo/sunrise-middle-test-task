"use client";

import { Filters } from "@/widgets/filters/filters";
import { Products } from "@/widgets/products"
import classes from './main.module.scss'
import { Sorting } from "@/widgets/sorting";

export function Main(){
    return (
        <>
            <Sorting />
            <div className={classes.container}>
                <Filters />
                <Products />
            </div>
        </>
    )
}