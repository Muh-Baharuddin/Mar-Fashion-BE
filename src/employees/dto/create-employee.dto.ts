import { IsDateString, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @MinLength(10)
  phone_number: string;

  @IsNotEmpty()
  @IsDateString()
  entry_date: Date;

  @IsDateString()
  exit_date: Date;

  @IsNotEmpty()
  @IsNumber()
  total_saving: number;
}
