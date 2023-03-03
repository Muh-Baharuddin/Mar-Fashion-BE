import { Sale } from "../entities/sale.entity";

export type SaleResponse = {
  data: Sale[];
  total: number;
}