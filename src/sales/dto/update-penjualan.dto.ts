import { PartialType } from '@nestjs/mapped-types';
import { CreatePenjualanDto } from './create-penjualan.dto';

export class UpdatePenjualanDto extends PartialType(CreatePenjualanDto) {}
