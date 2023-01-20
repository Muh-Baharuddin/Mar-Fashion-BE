import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaPembelianDto } from './create-nota-pembelian.dto';

export class UpdateNotaPembelianDto extends PartialType(CreateNotaPembelianDto) {}
