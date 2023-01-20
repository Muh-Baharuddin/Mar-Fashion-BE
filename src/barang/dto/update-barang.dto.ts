import { PartialType } from '@nestjs/mapped-types';
import { CreateBarangDto } from './create-barang.dto';

export class UpdateBarangDto extends PartialType(CreateBarangDto) {}
