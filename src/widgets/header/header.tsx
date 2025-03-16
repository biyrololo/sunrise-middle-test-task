"use client"

import classes from './header.module.scss'
import Link from 'next/link';
import { Cart } from '@/shared/cart';
import Image from 'next/image';

export function Header(){
    return (
        <header className={classes.header}>
            <Link href='/' className={classes.header__logo}>
                <h1>
                    Shop
                </h1>
                <Image
                    src="/next-logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                />
            </Link>
            <div className={classes.header__cart}>
                <Cart />
            </div>
        </header>
    )
}