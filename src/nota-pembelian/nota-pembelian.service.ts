import { Injectable } from '@nestjs/common';
import { CreateNotaPembelianDto } from './dto/create-nota-pembelian.dto';
import { UpdateNotaPembelianDto } from './dto/update-nota-pembelian.dto';

@Injectable()
export class NotaPembelianService {
  create(createNotaPembelianDto: CreateNotaPembelianDto) {
    return 'This action adds a new notaPembelian';
  }

  findAll() {
    return `This action returns all notaPembelian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notaPembelian`;
  }

  update(id: number, updateNotaPembelianDto: UpdateNotaPembelianDto) {
    return `This action updates a #${id} notaPembelian`;
  }

  remove(id: number) {
    return `This action removes a #${id} notaPembelian`;
  }
}
