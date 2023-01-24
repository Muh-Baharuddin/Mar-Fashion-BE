import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateNotaPembelianDto {
  @IsNotEmpty({ message: 'tanggal tidak boleh kosong' })
  @IsDate()
  tanggal: Date;

  @IsNotEmpty({ message: 'supplier tidak boleh kosong' })
  supplier: string;

  @IsNotEmpty({ message: 'barang tidak boleh kosong' })
  barang: string;

  @IsNotEmpty({ message: 'biaya tidak boleh kosong' })
  biaya: number;
}
