import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './mail/mail.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { GuardiansModule } from './guardians/guardians.module';
import { DoctorPatientsModule } from './doctor-patients/doctor-patients.module';
import { AccessCodesModule } from './access-codes/access-codes.module';
import { EvolutionsModule } from './evolutions/evolutions.module';
import { EvolutionBlocksModule } from './evolution-blocks/evolution-blocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'Secret.env' }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    SupabaseModule,
    GoogleCalendarModule,
    AuthModule,
    DoctorsModule,
    PatientsModule,
    MailModule,
    AppointmentsModule,
    GuardiansModule,
    DoctorPatientsModule,
    AccessCodesModule,
    EvolutionsModule,
    EvolutionBlocksModule,
  ],
})
export class AppModule {}