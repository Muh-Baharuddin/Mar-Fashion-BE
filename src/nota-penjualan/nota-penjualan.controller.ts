import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotaPenjualanService } from './nota-penjualan.service';
import { CreateNotaPenjualanDto } from './dto/create-nota-penjualan.dto';
import { UpdateNotaPenjualanDto } from './dto/update-nota-penjualan.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('nota-penjualan')
export class NotaPenjualanController {
  constructor(private readonly notaPenjualanService: NotaPenjualanService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.notaPenjualanService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.notaPenjualanService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createNotaPenjualanDto: CreateNotaPenjualanDto) {
    return this.notaPenjualanService.createPenjualan(createNotaPenjualanDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateNotaPenjualanDto: UpdateNotaPenjualanDto,
  ) {
    return this.notaPenjualanService.update(+id, updateNotaPenjualanDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notaPenjualanService.removePenjualan(id);
  }
}
