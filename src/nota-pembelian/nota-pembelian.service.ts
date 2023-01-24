import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNotaPembelianDto } from './dto/create-nota-pembelian.dto';
import { UpdateNotaPembelianDto } from './dto/update-nota-pembelian.dto';
import { NotaPembelian } from './entities/nota-pembelian.entity';
import { NotaPembelianRepository } from './nota-pembelian.repository';

@Injectable()
export class NotaPembelianService {
  private readonly logger = new Logger(NotaPembelianService.name);

  constructor(
    @Inject(NotaPembelianRepository)
    private readonly notaPembelianRepository: NotaPembelianRepository,
  ) {}

  create(createNotaPembelianDto: CreateNotaPembelianDto) {
    return 'This action adds a new notaPembelian';
  }

  async findAll(): Promise<NotaPembelian[]> {
    const notaPembelian =
      await this.notaPembelianRepository.findAllNotaPembelian();

    if (!notaPembelian.length) {
      throw new NotFoundException(`ups user not found`);
      this.logger.warn(`user tidak ketemu`);
    }

    return notaPembelian;
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
