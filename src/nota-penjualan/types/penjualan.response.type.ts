import { Penjualan } from "../entities/nota-penjualan.entity";

export type PenjualanResponse = {
  data: Penjualan[];
  total: number;
}