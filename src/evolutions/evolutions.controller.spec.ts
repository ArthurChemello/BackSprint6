import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionsController } from './evolutions.controller';

describe('EvolutionsController', () => {
  let controller: EvolutionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvolutionsController],
    }).compile();

    controller = module.get<EvolutionsController>(EvolutionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
