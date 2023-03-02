import { Module } from '@nestjs/common';
import { BarangService } from './item.service';
import { BarangController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './entities/items.entity';
import { Kategori } from './entities/category.entity';
import { BarangRepository } from './item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Barang, Kategori])],
  controllers: [BarangController],
  providers: [BarangService, BarangRepository],
})
export class BarangModule {}
