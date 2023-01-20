import { Module } from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';

@Module({
  controllers: [BarangController],
  providers: [BarangService]
})
export class BarangModule {}
