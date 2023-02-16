import { Supplier } from "../entities/supplier.entity";

export type SupplierResponse = {
  dataSupplier: Supplier[];
  total: number;
  currentPage: number;
}