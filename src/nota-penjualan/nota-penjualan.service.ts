import { Injectable } from '@nestjs/common';
import { CreateNotaPenjualanDto } from './dto/create-nota-penjualan.dto';
import { UpdateNotaPenjualanDto } from './dto/update-nota-penjualan.dto';

@Injectable()
export class NotaPenjualanService {
  create(createNotaPenjualanDto: CreateNotaPenjualanDto) {
    return 'This action adds a new notaPenjualan';
  }

  findAll() {
    return `This action returns all notaPenjualan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notaPenjualan`;
  }

  update(id: number, updateNotaPenjualanDto: UpdateNotaPenjualanDto) {
    return `This action updates a #${id} notaPenjualan`;
  }

  remove(id: number) {
    return `This action removes a #${id} notaPenjualan`;
  }
}
