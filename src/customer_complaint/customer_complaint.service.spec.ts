import { Test, TestingModule } from '@nestjs/testing';
import { CustomerComplaintService } from './customer_complaint.service';

describe('CustomerComplaintService', () => {
  let service: CustomerComplaintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerComplaintService],
    }).compile();

    service = module.get<CustomerComplaintService>(CustomerComplaintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
