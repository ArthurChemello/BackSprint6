import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPatientsController } from './doctor-patients.controller';

describe('DoctorPatientsController', () => {
  let controller: DoctorPatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorPatientsController],
    }).compile();

    controller = module.get<DoctorPatientsController>(DoctorPatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
