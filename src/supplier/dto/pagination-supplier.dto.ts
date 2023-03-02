import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class PaginationSupplierDto {
  @IsOptional()
  @IsInt({ message: 'nilai pada page harus berupa angka' })
  @Min(1, { message: 'nilai pada page harus lebih besar dari 0' })
  page: number = 1;

  @IsOptional()
  @IsInt({ message: 'nilai pada limit harus berupa angka' })
  @Min(1, { message: 'nilai pada page harus lebih besar dari 0' })
  limit: number = 1;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'orderType harus merupakan salah satu dari ASC atau DESC' })
  readonly orderType?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsIn(['nama', 'alamat', 'nomor_telepon'], { message: 'orderType harus merupakan salah satu dari nama, alamat atau nomor_telepon' })
  readonly orderBy?: 'nama' | 'alamat' | 'nomor_telepon' = 'nama';

  @IsOptional()
  @IsString({ message: 'keywords harus berupa string' })
  @Transform(({ value }) => value.trim())
  readonly keywords?: string;
}
