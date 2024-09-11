import { Supplier } from "../supplier/supplier"

export interface Order {
  id: string
  date:Date
  supplier: Supplier
  dateArrival: Date
}
