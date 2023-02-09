import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
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
  @UseGuards(JwtAuthGuard)
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Barang> {
    return this.barangService.findById(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createBarangDto: CreateBarangDto) {
    return this.barangService.createBarang(createBarangDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBarangDto: UpdateBarangDto,
  ) {
    return this.barangService.updateBarang(id, updateBarangDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.barangService.removeBarang(id);
  }
}
