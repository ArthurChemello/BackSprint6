import { Test, TestingModule } from '@nestjs/testing';
import { AccessCodesController } from './access-codes.controller';

describe('AccessCodesController', () => {
  let controller: AccessCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessCodesController],
    }).compile();

    controller = module.get<AccessCodesController>(AccessCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
