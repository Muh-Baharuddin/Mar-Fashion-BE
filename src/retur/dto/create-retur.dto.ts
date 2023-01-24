import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateReturDto {
  @IsNotEmpty({ message: 'tanggal retur tidak boleh kosong' })
  @IsDate()
  tanggal: Date;

  @IsNotEmpty({ message: 'barang yang diretur tidak boleh kosong' })
  barang: string;

  @IsNotEmpty({ message: 'jumlah barang yang diretur tidak boleh kosong' })
  jumlah: number;

  @IsNotEmpty({ message: 'harga dari barang yang diretur tidak boleh kosong' })
  harga: number;

  keterangan: string;
}
