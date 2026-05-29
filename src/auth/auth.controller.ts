import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(ThrottlerGuard)
  @Post('doctor/login')
  loginDoctor(@Body() body: { email: string; password: string }) {
    return this.authService.loginDoctor(body.email, body.password);
  }

  @UseGuards(ThrottlerGuard)
  @Post('patient/login')
  loginPatient(@Body() body: { email: string; password: string }) {
    return this.authService.loginPatient(body.email, body.password);
  }

  @Get('google')
  getGoogleAuthUrl(@Query('doctorId') doctorId: string) {
    return this.authService.getGoogleAuthUrl(doctorId);
  }

  @Get('google/callback')
  handleGoogleCallback(@Query('code') code: string, @Query('state') doctorId: string) {
    return this.authService.handleGoogleCallback(code, doctorId);
  }
}