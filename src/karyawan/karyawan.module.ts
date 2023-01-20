import { Module } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';

@Module({
  controllers: [KaryawanController],
  providers: [KaryawanService]
})
export class KaryawanModule {}
