import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotaPembelianService } from './nota-pembelian.service';
import { CreateNotaPembelianDto } from './dto/create-nota-pembelian.dto';
import { UpdateNotaPembelianDto } from './dto/update-nota-pembelian.dto';

@Controller('nota-pembelian')
export class NotaPembelianController {
  constructor(private readonly notaPembelianService: NotaPembelianService) {}

  @Post()
  create(@Body() createNotaPembelianDto: CreateNotaPembelianDto) {
    return this.notaPembelianService.create(createNotaPembelianDto);
  }

  @Get()
  findAll() {
    return this.notaPembelianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaPembelianService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotaPembelianDto: UpdateNotaPembelianDto,
  ) {
    return this.notaPembelianService.update(+id, updateNotaPembelianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaPembelianService.remove(+id);
  }
}
