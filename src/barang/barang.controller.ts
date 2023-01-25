import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
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

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBarangDto: CreateBarangDto) {
    return this.barangService.createBarang(createBarangDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBarangDto: UpdateBarangDto,
  ) {
    return this.barangService.updateBarang(id, updateBarangDto);
  }
}
