import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';
import { Karyawan } from './entities/karyawan.entity';
import { KaryawanRepository } from './karyawan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Karyawan])],
  providers: [KaryawanService, KaryawanRepository],
  controllers: [KaryawanController],
})
export class KaryawanModule {}
