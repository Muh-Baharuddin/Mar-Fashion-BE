import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Item } from '../../items/entities/items.entity';
import { TypeUnit } from '../types/type-unit.enum';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  cost: number;

  @IsOptional()
  Items: Item[];
}
