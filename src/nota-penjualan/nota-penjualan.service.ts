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

  create(createNotaPenjualanDto: CreateNotaPenjualanDto) {
    return 'This action adds a new notaPenjualan';
  }

  async findAll(): Promise<NotaPenjualan[]> {
    const penjualan = await this.notaPenjualanRepository.findAllNotaPenjualan();

    if (!penjualan.length) {
      throw new NotFoundException(`ups nota penjualan not found`);
      this.logger.warn(`nota penjualan tidak ketemu`);
    }

    return penjualan;
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
