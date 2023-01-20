import { Module } from '@nestjs/common';
import { NotaPenjualanService } from './nota-penjualan.service';
import { NotaPenjualanController } from './nota-penjualan.controller';

@Module({
  controllers: [NotaPenjualanController],
  providers: [NotaPenjualanService]
})
export class NotaPenjualanModule {}
