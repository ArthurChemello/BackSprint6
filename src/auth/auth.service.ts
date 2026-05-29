import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
import * as  bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly supabaseService: SupabaseService,
        private readonly googleCalendarService: GoogleCalendarService,
    ) { }

    async loginDoctor(email: string, password: string) {
        const { data: doctor } = await this.supabaseService.supabase
            .from('doctors')
            .select('*')
            .eq('email', email)
            .single();

        if (!doctor) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const validPassword = await bcrypt.compare(password, doctor.password);

        if (!validPassword) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = this.jwtService.sign({
            sub: doctor.id,
            email: doctor.email,
            role: 'doctor',
        });
        return { token, doctor };
    }

    async loginPatient(email: string, password: string) {
        const { data: patient } = await this.supabaseService.supabase
            .from('patients')
            .select('*')
            .eq('email', email)
            .single();

        if (!patient) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const validPassword = await bcrypt.compare(password, patient.password);

        if (!validPassword) { // ← adiciona validação de senha
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = this.jwtService.sign({
            sub: patient.id,
            email: patient.email,
            role: 'patient',
        });
        return { token, patient };
    }
    getGoogleAuthUrl(doctorId: string) {
        return this.googleCalendarService.getAuthUrl(doctorId);
    }

    async handleGoogleCallback(code: string, doctorId: string) {
        const tokens = await this.googleCalendarService.getToken(code);

        await this.supabaseService.supabase
            .from('google_tokens')
            .upsert({
                doctor_id: doctorId,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                expires_at: new Date(tokens.expiry_date),
            });

        return { message: 'Google Calendar conectado com sucesso!' };
    }
}