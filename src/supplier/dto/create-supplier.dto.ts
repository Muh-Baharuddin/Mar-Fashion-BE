import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'nama tidak boleh kosong' })
  nama: string;

  @IsNotEmpty({ message: 'alamat tidak boleh kosong' })
  alamat: string;

  @IsNotEmpty({ message: 'nomor telepon tidak boleh kosong' })
  @MinLength(10, { message: 'nomor telepon harus lebih dari 9 digit' })
  nomor_telepon: string;
}
