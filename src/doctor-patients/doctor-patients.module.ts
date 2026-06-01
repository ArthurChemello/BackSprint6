import { Module } from '@nestjs/common';
import { DoctorPatientsService } from './doctor-patients.service';
import { DoctorPatientsController } from './doctor-patients.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DoctorPatientsController],
  providers: [DoctorPatientsService],
  exports: [DoctorPatientsService],
})
export class DoctorPatientsModule {}