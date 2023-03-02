import { Module } from '@nestjs/common';
import { NotaPembelianService } from './nota-pembelian.service';
import { NotaPembelianController } from './nota-pembelian.controller';
import { NotaPembelian } from './entities/nota-pembelian.entity';
import { NotaPembelianRepository } from './nota-pembelian.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotaPembelian])],
  controllers: [NotaPembelianController],
  providers: [NotaPembelianService, NotaPembelianRepository]
})
export class NotaPembelianModule {}
