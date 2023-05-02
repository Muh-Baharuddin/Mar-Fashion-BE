import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from 'src/supplier/dto/pagination-supplier.dto';

export class PaginationCustomerDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['name', 'address', 'city', 'phone_number'])
  readonly orderBy?: 'name' | 'address' | 'city' | 'phone_number' = 'name';
}
