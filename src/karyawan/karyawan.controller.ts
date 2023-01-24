import { Controller, Get } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @Get()
  findAll() {
    return this.karyawanService.findAllKaryawan();
  }
}
