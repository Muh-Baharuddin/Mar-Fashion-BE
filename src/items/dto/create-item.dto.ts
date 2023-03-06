import { IsNotEmpty } from "class-validator";

export class CreateItemDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  capital_price: number;

  @IsNotEmpty()
  wholescale_price: number;

  @IsNotEmpty()
  stock: number = 0;
}
