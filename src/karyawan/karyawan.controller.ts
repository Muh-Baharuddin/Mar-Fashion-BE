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
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { Karyawan } from './entities/karyawan.entity';
import { KaryawanService } from './karyawan.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.karyawanService.findAllKaryawan();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Karyawan> {
    return this.karyawanService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createKaryawanDto: CreateKaryawanDto) {
    return this.karyawanService.createKaryawan(createKaryawanDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKaryawanDto: UpdateKaryawanDto,
  ) {
    return this.karyawanService.updateKaryawan(id, updateKaryawanDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.karyawanService.removeKaryawan(id);
  }
}
