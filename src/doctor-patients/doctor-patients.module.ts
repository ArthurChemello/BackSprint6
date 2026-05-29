import { Module } from '@nestjs/common';
import { DoctorPatientsController } from './doctor-patients.controller';
import { DoctorPatientsService } from './doctor-patients.service';

@Module({
  controllers: [DoctorPatientsController],
  providers: [DoctorPatientsService]
})
export class DoctorPatientsModule {}
