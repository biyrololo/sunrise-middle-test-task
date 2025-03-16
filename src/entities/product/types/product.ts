export type Product = {
    id: number;
    name: string;
    brand: string;
    price: number;
    description: string;
    isNew: boolean;
};

export type ProductSort = keyof Omit<Product, 'id' | 'isNew' | 'description'>;