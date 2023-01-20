import { Injectable } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';

@Injectable()
export class KaryawanService {
  create(createKaryawanDto: CreateKaryawanDto) {
    return 'This action adds a new karyawan';
  }

  findAll() {
    return `This action returns all karyawan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} karyawan`;
  }

  update(id: number, updateKaryawanDto: UpdateKaryawanDto) {
    return `This action updates a #${id} karyawan`;
  }

  remove(id: number) {
    return `This action removes a #${id} karyawan`;
  }
}
