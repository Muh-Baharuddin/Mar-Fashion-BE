import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from '../../supplier/dto/pagination-supplier.dto';

export class PaginationComplaintDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['name', 'address', 'city', 'description'])
  readonly orderBy?: 'name' | 'address' | 'city' | 'description' = 'name';
}
