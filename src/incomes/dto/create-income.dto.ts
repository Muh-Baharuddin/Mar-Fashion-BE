import { IsNotEmpty } from "class-validator";

export class CreateIncomeDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  description: string;
}
