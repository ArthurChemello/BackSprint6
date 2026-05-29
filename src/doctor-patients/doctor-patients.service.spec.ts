import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPatientsService } from './doctor-patients.service';

describe('DoctorPatientsService', () => {
  let service: DoctorPatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorPatientsService],
    }).compile();

    service = module.get<DoctorPatientsService>(DoctorPatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
