import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { MedrecordsModule } from './medrecords/medrecords.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'Secret.env' }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    SupabaseModule,
    AuthModule,
    DoctorsModule,
    PatientsModule,
    MedrecordsModule,
  ],
})
export class AppModule {}