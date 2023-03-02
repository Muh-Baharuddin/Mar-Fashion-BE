import { Test, TestingModule } from '@nestjs/testing';
import { NotaPembelianService } from './nota-pembelian.service';

describe('NotaPembelianService', () => {
  let service: NotaPembelianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaPembelianService],
    }).compile();

    service = module.get<NotaPembelianService>(NotaPembelianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
