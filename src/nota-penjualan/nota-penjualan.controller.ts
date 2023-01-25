import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotaPenjualanService } from './nota-penjualan.service';
import { CreateNotaPenjualanDto } from './dto/create-nota-penjualan.dto';
import { UpdateNotaPenjualanDto } from './dto/update-nota-penjualan.dto';

@Controller('nota-penjualan')
export class NotaPenjualanController {
  constructor(private readonly notaPenjualanService: NotaPenjualanService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createNotaPenjualanDto: CreateNotaPenjualanDto) {
    return this.notaPenjualanService.createPenjualan(createNotaPenjualanDto);
  }

  @Get()
  findAll() {
    return this.notaPenjualanService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.notaPenjualanService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotaPenjualanDto: UpdateNotaPenjualanDto,
  ) {
    return this.notaPenjualanService.update(+id, updateNotaPenjualanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notaPenjualanService.removePenjualan(id);
  }
}
