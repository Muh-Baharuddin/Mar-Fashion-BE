import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BarangRepository } from './barang.repository';
import { Barang } from './entities/barang.entity';

@Injectable()
export class BarangService {
  private readonly logger = new Logger(BarangService.name);

  constructor(
    @Inject(BarangRepository)
    private readonly barangRepository: BarangRepository,
  ) {}

  async findAllBarang(): Promise<Barang[]> {
    const barang = await this.barangRepository.findAllBarang();

    if (!barang.length) {
      throw new NotFoundException(`ups barang not found`);
      this.logger.warn(`barang tidak ketemu`);
    }
    return barang;
  }
}
