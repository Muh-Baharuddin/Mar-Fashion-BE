import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { KaryawanRepository } from './karyawan.repository';
import { Karyawan } from './entities/karyawan.entity';


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
}
