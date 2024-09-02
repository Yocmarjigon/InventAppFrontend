import { ProductSale } from "./product-sale.interface";

export interface Sale{
   id: string;
   date: Date ;
   priceTotal: string;
   products:ProductSale[];
  /* user: User ; */
}
