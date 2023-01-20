import { Test, TestingModule } from '@nestjs/testing';
import { KaryawanService } from './karyawan.service';

describe('KaryawanService', () => {
  let service: KaryawanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KaryawanService],
    }).compile();

    service = module.get<KaryawanService>(KaryawanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
