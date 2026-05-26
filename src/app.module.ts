import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { MedrecordsModule } from './medrecords/medrecords.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'Secret.env', }),
    SupabaseModule,
    DoctorsModule,
    PatientsModule,
    MedrecordsModule,
  ],
})
export class AppModule {}