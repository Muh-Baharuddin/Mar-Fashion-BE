import { IsOptional } from "class-validator";

export class CreateStoreLocationDto {
  @IsOptional()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;
}
