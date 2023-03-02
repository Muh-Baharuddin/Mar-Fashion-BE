import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty({ message: 'date cannot be empty' })
  @IsDateString()
  tanggal: Date;

  @IsNotEmpty({ message: 'supplier cannot be empty' })
  supplier: string;

  @IsNotEmpty({ message: 'item cannot be empty' })
  barang: string;

  @IsNotEmpty({ message: 'cost cannot be empty' })
  biaya: number;
}
