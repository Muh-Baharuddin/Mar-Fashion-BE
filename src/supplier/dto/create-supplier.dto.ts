import { IsNotEmpty, IsInt, Min, MinLength, IsOptional, IsIn, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'nama tidak boleh kosong' })
  nama: string;

  @IsNotEmpty({ message: 'alamat tidak boleh kosong' })
  alamat: string;

  @IsNotEmpty({ message: 'nomor telepon tidak boleh kosong' })
  @MinLength(10)
  nomor_telepon: string;
}

export class PaginationSupplierDto {
  @IsInt()
  @Min(1)
  readonly page: number;

  @IsInt()
  @Min(1)
  readonly limit: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  readonly nama: string;
}
