import { OmitType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationSupplierDto } from '../../supplier/dto/pagination-supplier.dto';

export class PaginationCategoryDto extends OmitType(PaginationSupplierDto, [
    'orderBy', 'keywords'
  ] as const) {
  @IsOptional()
  @IsIn(['name'])
  readonly orderBy?: 'name' = 'name';
}
