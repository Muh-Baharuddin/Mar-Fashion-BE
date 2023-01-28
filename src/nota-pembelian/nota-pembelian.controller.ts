import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotaPembelianService } from './nota-pembelian.service';
import { CreateNotaPembelianDto } from './dto/create-nota-pembelian.dto';
import { UpdateNotaPembelianDto } from './dto/update-nota-pembelian.dto';
import { NotaPembelian } from './entities/nota-pembelian.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('nota-pembelian')
@UseGuards(JwtAuthGuard)
export class NotaPembelianController {
  constructor(private readonly notaPembelianService: NotaPembelianService) {}

  @Get()
  findAll() {
    return this.notaPembelianService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<NotaPembelian> {
    return this.notaPembelianService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createNotaPembelianDto: CreateNotaPembelianDto) {
    return this.notaPembelianService.create(createNotaPembelianDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNotaPembelianDto: UpdateNotaPembelianDto,
  ) {
    return this.notaPembelianService.update(id, updateNotaPembelianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaPembelianService.remove(id);
  }
}
