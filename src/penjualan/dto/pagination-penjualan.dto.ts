import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from 'src/supplier/dto/pagination-supplier.dto';

export class PaginationPenjualanDto extends OmitType(PaginationSupplierDto, [
    'orderBy', 'keywords',
  ] as const) {
  @IsOptional()
  @IsIn(['tanggal', 'barang', 'jumlah_barang', 'total_harga'], {
    message:
      'orderType harus merupakan salah satu dari tanggal, barang, jumlah_barang atau total_harga',
  })
  readonly orderBy?: 'tanggal' | 'barang' | 'jumlah_barang' | 'total_harga' = 'tanggal';

  @IsOptional()
  readonly keywords?: string | Date | number;
}
