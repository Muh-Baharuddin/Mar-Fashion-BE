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

  async findAll(): Promise<NotaPembelian[]> {
    const notaPembelian =
      await this.notaPembelianRepository.findAllNotaPembelian();

    if (!notaPembelian.length) {
      throw new NotFoundException(`ups nota pembelian not found`);
      this.logger.warn(`nota pembelian tidak ketemu`);
    }

    return notaPembelian;
  }

  async findById(id: string): Promise<NotaPembelian> {
    const pembelian = await this.notaPembelianRepository.findById(id);

    if (!pembelian) {
      throw new NotFoundException(`ups pembelian not found`);
      this.logger.warn(`pembelian tidak ketemu`);
    }
    return pembelian;
  }

  create(
    createNotaPembelianDto: CreateNotaPembelianDto,
  ): Promise<NotaPembelian> {
    return this.notaPembelianRepository.createPembelian(createNotaPembelianDto);
  }

  async update(id: string, updateNotaPembelianDto: UpdateNotaPembelianDto) {
    const pembelian = await this.notaPembelianRepository.findById(id);

    if (!pembelian) {
      throw new NotFoundException(`ups pembelian not found`);
      this.logger.warn(`pembelian tidak ketemu`);
    }
    return this.notaPembelianRepository.updatePembelian(
      id,
      updateNotaPembelianDto,
    );
  }

  async remove(id: string) {
    const pembelian = await this.notaPembelianRepository.findById(id);

    if (!pembelian) {
      throw new NotFoundException(`ups pembelian not found`);
      this.logger.warn(`pembelian tidak ketemu`);
    }
    return this.notaPembelianRepository.removePembelian(id);
  }
}
