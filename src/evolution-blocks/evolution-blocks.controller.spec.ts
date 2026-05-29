import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionBlocksController } from './evolution-blocks.controller';

describe('EvolutionBlocksController', () => {
  let controller: EvolutionBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvolutionBlocksController],
    }).compile();

    controller = module.get<EvolutionBlocksController>(EvolutionBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
