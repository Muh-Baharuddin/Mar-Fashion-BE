import { IsOptional, IsNotEmpty } from "class-validator";

export class CreateComplaintDto {
  @IsNotEmpty()
  invoice: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsNotEmpty()
  description: string
}
