import { Test, TestingModule } from '@nestjs/testing';
import { CustomerComplaintController } from './customer_complaint.controller';
import { CustomerComplaintService } from './customer_complaint.service';

describe('CustomerComplaintController', () => {
  let controller: CustomerComplaintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerComplaintController],
      providers: [CustomerComplaintService],
    }).compile();

    controller = module.get<CustomerComplaintController>(CustomerComplaintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
