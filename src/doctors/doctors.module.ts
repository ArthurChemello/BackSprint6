import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { UploadModule } from '../upload/upload.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UploadModule, AuthModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}