import { Module } from '@nestjs/common';
import { NotaPembelianService } from './nota-pembelian.service';
import { NotaPembelianController } from './nota-pembelian.controller';

@Module({
  controllers: [NotaPembelianController],
  providers: [NotaPembelianService]
})
export class NotaPembelianModule {}
