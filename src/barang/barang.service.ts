import { Injectable } from '@nestjs/common';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

@Injectable()
export class BarangService {
  create(createBarangDto: CreateBarangDto) {
    return 'This action adds a new barang';
  }

  findAll() {
    return `This action returns all barang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barang`;
  }

  update(id: number, updateBarangDto: UpdateBarangDto) {
    return `This action updates a #${id} barang`;
  }

  remove(id: number) {
    return `This action removes a #${id} barang`;
  }
}
