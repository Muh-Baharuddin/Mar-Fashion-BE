import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Item } from '../../items/entities/items.entity';
import { TypeUnit } from '../types/type-unit.enum';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  invoice: string;

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  cost: number;

  @IsOptional()
  debt: number;

  @IsNotEmpty()
  item: Item;

  @IsNotEmpty()
  supplier: Supplier;
}
