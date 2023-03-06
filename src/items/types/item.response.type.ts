import { Item } from "../entities/items.entity";

export type ItemResponse = {
  data: Item[];
  total: number;
}