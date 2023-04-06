import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { TypeSaving } from '../types/type-saving.enum';

export class CreateEmployeeSavingDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  type: TypeSaving;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  __employee__: {
    id: string,
    name: string,
  };
}
