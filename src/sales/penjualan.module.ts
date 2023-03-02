import { Module } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { PenjualanController } from './penjualan.controller';
import { Penjualan } from './entities/penjualan.entity';
import { PenjualanRepository } from './penjualan.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Penjualan])],
  controllers: [PenjualanController],
  providers: [PenjualanService, PenjualanRepository]
})
export class PenjualanModule {}
