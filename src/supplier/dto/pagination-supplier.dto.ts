import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class PaginationSupplierDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 1;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly orderType?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsIn(['name', 'address', 'city', 'phone_number', 'account_number', 'account_owner', 'bank'])
  readonly orderBy?:
    'name' | 'address' | 'city' |
    'phone_number' | 'account_number' |
    'account_owner' | 'bank' = 'name';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly keywords?: string;
}
