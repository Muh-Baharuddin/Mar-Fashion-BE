import { IsOptional, IsNotEmpty } from "class-validator";


export class CreateCustomerComplaintDto {
  @IsOptional()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsNotEmpty()
  description: string
}
