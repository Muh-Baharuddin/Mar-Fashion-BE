import { Inject, Injectable, Logger } from '@nestjs/common';
import { BarangRepository } from './barang.repository';

@Injectable()
export class BarangService {
  private readonly logger = new Logger(BarangService.name);

  constructor(
    @Inject(BarangRepository)
    private readonly barangRepository: BarangRepository,
  ) {}
}
