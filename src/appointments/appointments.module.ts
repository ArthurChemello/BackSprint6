import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { GoogleCalendarModule } from '../google-calendar/google-calendar.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [GoogleCalendarModule, AuthModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}