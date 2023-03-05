import { IsNotEmpty, IsDateString } from 'class-validator';
import { TypeUnit } from '../../purchases/types/type-unit.enum';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  total_sales: number;

  @IsNotEmpty()
  total_price: number;
}
