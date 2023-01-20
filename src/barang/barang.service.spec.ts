import { Test, TestingModule } from '@nestjs/testing';
import { BarangService } from './barang.service';

describe('BarangService', () => {
  let service: BarangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarangService],
    }).compile();

    service = module.get<BarangService>(BarangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
