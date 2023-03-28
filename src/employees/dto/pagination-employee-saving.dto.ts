import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from '../../supplier/dto/pagination-supplier.dto';

export class PaginationSavingDto extends OmitType(PaginationSupplierDto, [
    'orderBy'
  ] as const) {
  @IsOptional()
  @IsIn(['date', 'type', 'total', 'description', 'employee'])
  readonly orderBy?: 'date' | 'type' | 'total' | 'description' | 'employee' = 'date';
}
