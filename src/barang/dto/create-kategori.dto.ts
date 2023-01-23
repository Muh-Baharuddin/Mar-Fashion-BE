import { IsNotEmpty } from 'class-validator';

export class KategoriDto {
  @IsNotEmpty({ message: 'nama kategori tidak boleh kosong' })
  nama: string;
}