import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { BarangService } from './barang.service';
import { Barang } from './entities/barang.entity';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Get()
  findAll() {
    return this.barangService.findAllBarang();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Barang> {
    return this.barangService.findById(id);
  }

}
