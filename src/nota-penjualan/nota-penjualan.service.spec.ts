import { Test, TestingModule } from '@nestjs/testing';
import { NotaPenjualanService } from './nota-penjualan.service';

describe('NotaPenjualanService', () => {
  let service: NotaPenjualanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaPenjualanService],
    }).compile();

    service = module.get<NotaPenjualanService>(NotaPenjualanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
