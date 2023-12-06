import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from '../../supplier/dto/pagination-supplier.dto';

export class PaginationPurchaseDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['invoice', 'date', 'item', 'unit', 'amount', 'cost', 'total', 'debt', 'supplier'])
  readonly orderBy?: 'invoice' | 'date' | 'item' | 'unit' |'amount' | 'cost' | 'total' | 'debt' | 'supplier' = 'date';
}
