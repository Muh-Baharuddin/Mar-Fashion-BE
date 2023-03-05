import { IsNotEmpty, IsDateString } from 'class-validator';
import { TypeUnit } from '../types/type-unit.enum';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  cost: number;
}
