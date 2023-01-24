import { Module } from '@nestjs/common';
import { NotaPenjualanService } from './nota-penjualan.service';
import { NotaPenjualanController } from './nota-penjualan.controller';
import { NotaPenjualan } from './entities/nota-penjualan.entity';
import { NotaPenjualanRepository } from './nota-penjualan.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotaPenjualan])],
  controllers: [NotaPenjualanController],
  providers: [NotaPenjualanService, NotaPenjualanRepository]
})
export class NotaPenjualanModule {}
