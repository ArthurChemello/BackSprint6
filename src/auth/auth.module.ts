import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleCalendarModule } from '../google-calendar/google-calendar.module';

@Module ({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        }),
        GoogleCalendarModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
