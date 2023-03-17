import { IsNotEmpty } from "class-validator";
import { Category } from "../entities/category.entity";
import { CategoryDto } from "./create-category.dto";

export class CreateItemDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  capital_price: number;

  @IsNotEmpty()
  wholescale_price: number;

  @IsNotEmpty()
  stock: number;

  // categories: CategoryDto[];

  categories: Category[];
}
