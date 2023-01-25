import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { Karyawan } from './entities/karyawan.entity';
import { KaryawanService } from './karyawan.service';

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @Get()
  findAll() {
    return this.karyawanService.findAllKaryawan();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Karyawan> {
    return this.karyawanService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createKaryawanDto: CreateKaryawanDto) {
    return this.karyawanService.createKaryawan(createKaryawanDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKaryawanDto: UpdateKaryawanDto,
  ) {
    return this.karyawanService.updateKaryawan(id, updateKaryawanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.karyawanService.removeKaryawan(id);
  }
}
