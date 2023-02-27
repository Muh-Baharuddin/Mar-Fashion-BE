import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { PaginationPenjualanDto } from './dto/pagination-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { Penjualan } from './entities/penjualan.entity';
import { PenjualanRepository } from './penjualan.repository';
import { PenjualanResponse } from './types/penjualan.response.type';

@Injectable()
export class PenjualanService {
  private readonly logger = new Logger(PenjualanService.name);

  constructor(
    @Inject(PenjualanRepository)
    private readonly penjualanRepository: PenjualanRepository,
  ) {}

  async findAll(
    paginationPenjualanDto: PaginationPenjualanDto,
  ): Promise<PenjualanResponse> {
    return await this.penjualanRepository.findAllPenjualan(paginationPenjualanDto);
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
