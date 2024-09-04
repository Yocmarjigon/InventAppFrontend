import { Category } from "../category/category";
import { Supplier } from "../supplier/supplier";

export interface Product {
    id: string;
    name: string;
    description: string;
    dateAdd: Date;
    price: string;
    stock: number;
    category: Category;
    supplier: Supplier;
}
