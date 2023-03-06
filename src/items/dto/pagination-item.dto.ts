import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from '../../supplier/dto/pagination-supplier.dto';

export class PaginationItemDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['brand', 'capital_price', 'wholescale_price', 'stock'])
  readonly orderBy?: 'brand' | 'capital_price' | 'wholescale_price' | 'stock' = 'brand';
}
