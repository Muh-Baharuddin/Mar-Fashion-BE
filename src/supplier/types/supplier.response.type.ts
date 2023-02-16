import { Supplier } from "../entities/supplier.entity";

export type SupplierResponse = {
  data: Supplier[];
  total: number;
}