import { Category } from "../entities/category.entity";

export type CategoryResponse = {
  data: Category[];
  total: number;
}