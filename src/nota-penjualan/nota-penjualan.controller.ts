import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotaPenjualanService } from './nota-penjualan.service';
import { CreateNotaPenjualanDto } from './dto/create-nota-penjualan.dto';
import { UpdateNotaPenjualanDto } from './dto/update-nota-penjualan.dto';

@Controller('nota-penjualan')
export class NotaPenjualanController {
  constructor(private readonly notaPenjualanService: NotaPenjualanService) {}

  @Post()
  create(@Body() createNotaPenjualanDto: CreateNotaPenjualanDto) {
    return this.notaPenjualanService.create(createNotaPenjualanDto);
  }

  @Get()
  findAll() {
    return this.notaPenjualanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaPenjualanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotaPenjualanDto: UpdateNotaPenjualanDto,
  ) {
    return this.notaPenjualanService.update(+id, updateNotaPenjualanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaPenjualanService.remove(+id);
  }
}
