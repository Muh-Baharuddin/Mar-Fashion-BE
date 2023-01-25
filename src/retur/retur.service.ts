import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';
import { Retur } from './entities/retur.entity';
import { ReturRepository } from './retur.repository';

@Injectable()
export class ReturService {
  private readonly logger = new Logger(ReturService.name);

  constructor(
    @Inject(ReturRepository)
    private readonly returRepository: ReturRepository,
  ) {}

  async findAll(): Promise<Retur[]> {
    const retur = await this.returRepository.findAllRetur();

    if (!retur.length) {
      throw new NotFoundException(`ups retur not found`);
      this.logger.warn(`retur tidak ketemu`);
    }

    return retur;
  }

  async findById(id: string): Promise<Retur> {
    const retur = await this.returRepository.findById(id);

    if (!retur) {
      throw new NotFoundException(`ups retur not found`);
      this.logger.warn(`retur tidak ketemu`);
    }
    return retur;
  }

  create(createReturDto: CreateReturDto): Promise<Retur> {
    return this.returRepository.createRetur(createReturDto);
  }

  async update(id: string, updateReturDto: UpdateReturDto) {
    const retur = await this.returRepository.findById(id);

    if (!retur) {
      throw new NotFoundException(`ups retur not found`);
      this.logger.warn(`retur tidak ketemu`);
    }
    return this.returRepository.updateRetur(id, updateReturDto);
  }

  remove(id: number) {
    return `This action removes a #${id} retur`;
  }
}
