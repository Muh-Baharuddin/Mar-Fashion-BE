import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Item } from '../../items/entities/items.entity';
import { TypeUnit } from '../types/type-unit.enum';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  invoice: number;

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  total: number;

  @IsOptional()
  debt: number;

  @IsNotEmpty()
  items: Item[];

  @IsNotEmpty()
  supplier: Supplier;
}
