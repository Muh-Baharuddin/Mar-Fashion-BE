import { Module } from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './entities/barang.entity';
import { Kategori } from './entities/kategori.entity';
import { BarangRepository } from './barang.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Barang, Kategori])],
  controllers: [BarangController],
  providers: [BarangService, BarangRepository],
})
export class BarangModule {}
