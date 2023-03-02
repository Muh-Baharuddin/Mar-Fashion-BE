import { Penjualan } from "../entities/penjualan.entity";

export type PenjualanResponse = {
  data: Penjualan[];
  total: number;
}