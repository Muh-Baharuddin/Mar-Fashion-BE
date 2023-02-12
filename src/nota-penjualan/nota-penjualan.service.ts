import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNotaPenjualanDto } from './dto/create-nota-penjualan.dto';
import { UpdateNotaPenjualanDto } from './dto/update-nota-penjualan.dto';
import { NotaPenjualan } from './entities/nota-penjualan.entity';
import { NotaPenjualanRepository } from './nota-penjualan.repository';

@Injectable()
export class NotaPenjualanService {
  private readonly logger = new Logger(NotaPenjualanService.name);

  constructor(
    @Inject(NotaPenjualanRepository)
    private readonly notaPenjualanRepository: NotaPenjualanRepository,
  ) {}

  async findAll(): Promise<NotaPenjualan[]> {
    const penjualan = await this.notaPenjualanRepository.findAllNotaPenjualan();

    if (!penjualan.length) {
      throw new NotFoundException(`ups nota penjualan not found`);
      this.logger.warn(`nota penjualan tidak ketemu`);
    }

    return penjualan;
  }

  async findById(id: string) {
    const penjualan = await this.notaPenjualanRepository.findById(id);

    if (!penjualan) {
      throw new NotFoundException('nota penjualan tidak ditemukan');
    }
    return penjualan;
  }

  createPenjualan(createNotaPenjualanDto: CreateNotaPenjualanDto) {
    return this.notaPenjualanRepository.createPenjualan(createNotaPenjualanDto);
  }

  async update(id: string, updateNotaPenjualanDto: UpdateNotaPenjualanDto) {
    const penjualan = await this.notaPenjualanRepository.findById(id);

    if (!penjualan) {
      throw new NotFoundException(`ups penjualan not found`);
    }

    return this.notaPenjualanRepository.updatePenjualan(
      id,
      updateNotaPenjualanDto,
    );
  }

  async removePenjualan(id: string) {
    const penjualan = await this.notaPenjualanRepository.findById(id);

    if (!penjualan) {
      throw new NotFoundException('nota penjualan tidak ditemukan');
    }
    return this.notaPenjualanRepository.removePenjualan(id);
  }
}
