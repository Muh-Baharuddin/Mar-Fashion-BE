import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { Karyawan } from './entities/karyawan.entity';
import { KaryawanRepository } from './karyawan.repository';

@Injectable()
export class KaryawanService {
  private readonly logger = new Logger(KaryawanService.name);

  constructor(
    @Inject(KaryawanRepository)
    private readonly karyawanRepository: KaryawanRepository,
  ) {}

  async findAllKaryawan(): Promise<Karyawan[]> {
    const employee = await this.karyawanRepository.findAllKaryawan();

    if (!employee.length) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return employee;
  }

  async findById(id: string): Promise<Karyawan> {
    const karyawan = await this.karyawanRepository.findById(id);

    if (!karyawan) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return karyawan;
  }

  createKaryawan(createKaryawanDto: CreateKaryawanDto): Promise<Karyawan> {
    return this.karyawanRepository.createKaryawan(createKaryawanDto);
  }

  async updateKaryawan(id: string, updateKaryawanDto: UpdateKaryawanDto) {
    const karyawan = await this.karyawanRepository.findById(id);

    if (!karyawan) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return this.karyawanRepository.updateKaryawan(id, updateKaryawanDto);
  }

  async removeKaryawan(id: string) {
    const karyawan = await this.karyawanRepository.findById(id);

    if (!karyawan) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return this.karyawanRepository.removeKaryawan(id);
  }
}
