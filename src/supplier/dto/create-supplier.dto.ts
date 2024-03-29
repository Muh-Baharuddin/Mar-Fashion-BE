import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Item } from '../../items/entities/items.entity';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @MinLength(10)
  phone_number: string;

  @IsNotEmpty()
  @MinLength(10)
  account_number: string;

  @IsNotEmpty()
  account_owner: string;

  @IsNotEmpty()
  bank: string;

  @IsOptional()
  items: Item[];
}
