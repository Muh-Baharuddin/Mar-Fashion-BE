import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class PaginationSupplierDto {
  @IsInt()
  @Min(1)
  readonly page: number;

  @IsInt()
  @Min(1)
  readonly limit: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly orderType?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsIn(['nama', 'alamat', 'nomor_telepon'])
  readonly orderBy?: 'nama' | 'alamat' | 'nomor_telepon';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly keywords?: string;
}
