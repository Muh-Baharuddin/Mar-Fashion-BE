import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty({ message: 'tanggal tidak boleh kosong' })
  @IsDateString()
  tanggal: Date;

  @IsNotEmpty({ message: 'barang tidak boleh kosong' })
  barang: string;

  @IsNotEmpty({ message: 'jumlah barang yang terjual tidak boleh kosong' })
  jumlah_barang: number;

  @IsNotEmpty({ message: 'total harga barang tidak boleh kosong' })
  total_harga: number;
}
