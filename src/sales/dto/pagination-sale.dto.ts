import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationSupplierDto } from 'src/supplier/dto/pagination-supplier.dto';

export class PaginationSaleDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['invoice', 'date', 'customer', 'item', 'unit', 'amount', 'total'])
  readonly orderBy?: 'invoice' | 'date' | 'customer' | 'item' | 'unit' | 'amount' | 'total' = 'invoice';
}
