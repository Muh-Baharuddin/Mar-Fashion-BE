import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotaPembelianService } from './nota-pembelian.service';
import { CreateNotaPembelianDto } from './dto/create-nota-pembelian.dto';
import { UpdateNotaPembelianDto } from './dto/update-nota-pembelian.dto';
import { NotaPembelian } from './entities/nota-pembelian.entity';

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
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<NotaPembelian> {
    return this.notaPembelianService.findById(id);
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
