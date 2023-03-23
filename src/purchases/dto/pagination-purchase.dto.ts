import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from '../../supplier/dto/pagination-supplier.dto';

export class PaginationPurchaseDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['date', 'unit', 'cost', 'total_item'])
  readonly orderBy?: 'date' | 'unit' | 'cost' | 'total_item' = 'date';
}
