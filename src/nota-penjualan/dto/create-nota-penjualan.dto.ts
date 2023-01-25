import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateNotaPenjualanDto {
  @IsNotEmpty({ message: 'tanggal tidak boleh kosong' })
  @IsDateString()
  tanggal: Date;

  @IsNotEmpty({ message: 'barang tidak boleh kosong' })
  barang: string;

  @IsNotEmpty({ message: 'jumlah barang yang terjual tidak boleh kosong' })
  jumlah: number;

  @IsNotEmpty({ message: 'harga barang tidak boleh kosong' })
  harga: number;
}
