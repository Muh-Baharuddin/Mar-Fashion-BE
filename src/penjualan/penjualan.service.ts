import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { Penjualan } from './entities/penjualan.entity';
import { PenjualanRepository } from './penjualan.repository';

@Injectable()
export class PenjualanService {
  private readonly logger = new Logger(PenjualanService.name);

  constructor(
    @Inject(PenjualanRepository)
    private readonly penjualanRepository: PenjualanRepository,
  ) {}

  async findAll(): Promise<Penjualan[]> {
    const penjualan = await this.penjualanRepository.findAllPenjualan();

    if (!penjualan.length) {
      this.logger.warn(`penjualan tidak ketemu`);
      throw new NotFoundException(`ups nota penjualan not found`);
    }

    return penjualan;
  }

  async findById(id: string) {
    const penjualan = await this.penjualanRepository.findById(id);

    if (!penjualan) {
      throw new NotFoundException('penjualan tidak ditemukan');
    }
    return penjualan;
  }

  createPenjualan(createPenjualanDto: CreatePenjualanDto) {
    return this.penjualanRepository.createPenjualan(createPenjualanDto);
  }

  async update(id: string, updatePenjualanDto: UpdatePenjualanDto) {
    const penjualan = await this.penjualanRepository.findById(id);

    if (!penjualan) {
      throw new NotFoundException(`penjualan tidak ditemukan`);
    }

    return this.penjualanRepository.updatePenjualan(
      id,
      updatePenjualanDto,
    );
  }

  async removePenjualan(id: string) {
    const penjualan = await this.penjualanRepository.findById(id);

    if (!penjualan) {
      throw new NotFoundException('penjualan tidak ditemukan');
    }
    return this.penjualanRepository.removePenjualan(id);
  }
}
