import { IsNotEmpty } from "class-validator";

export class CreateExpenseDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  description: string;
}
