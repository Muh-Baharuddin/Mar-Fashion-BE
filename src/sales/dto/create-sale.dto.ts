import { IsNotEmpty, IsDateString } from 'class-validator';
import { TypeUnit } from '../../purchases/types/type-unit.enum';
import { Customer } from '../../customer/entities/customer.entity';
import { Item } from '../../items/entities/items.entity';

export class CreateSaleDto {
  invoice: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  customer: Customer;

  @IsNotEmpty()
  item: Item;

  @IsNotEmpty()
  unit: TypeUnit;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  total: number;
}
