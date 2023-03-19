import { IsNotEmpty, IsOptional } from "class-validator";
import { Category } from "../entities/category.entity";

export class CreateItemDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  capital_price: number;

  @IsNotEmpty()
  wholescale_price: number;

  @IsNotEmpty()
  stock: number;

  @IsOptional()
  supplierId: string;

  @IsOptional()
  categories: Category[];
}
