import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { TypeUnit } from '../../purchases/types/type-unit.enum';
import { Item } from '../../items/entities/items.entity';

export class CreateSaleDto {
  invoice: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  customer: string;

  @IsNotEmpty()
  __items__: Item[];

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  total: number;
}
