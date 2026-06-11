import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
import { MailService } from '../mail/mail.service';
import * as  bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly supabaseService: SupabaseService,
        private readonly googleCalendarService: GoogleCalendarService,
        private readonly mailService: MailService,
    ) { }

    async loginDoctor(email: string, password: string) {
        const { data: doctor } = await this.supabaseService.supabase
            .from('doctors')
            .select('*')
            .eq('email', email.toLowerCase())
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
            .eq('email', email.toLowerCase())
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

    async forgotPassword(email: string) {
        const emailLower = email.toLowerCase();
        const { data: doctor } = await this.supabaseService.supabase
            .from('doctors')
            .select('id, email')
            .eq('email', emailLower)
            .single();

        const { data: patient } = await this.supabaseService.supabase
            .from('patients')
            .select('id, email')
            .eq('email', emailLower)
            .single();

        if (!doctor && !patient) {
            throw new Error('Email não encontrado');
        }

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const expires_at = new Date(Date.now() + 60 * 60 * 1000);

        await this.supabaseService.supabase
            .from('password_resets')
            .insert({ email: emailLower, code, expires_at });

        await this.mailService.sendPasswordReset(emailLower, code);

        return { message: 'Código enviado para o email!' };
    }

    async resetPassword(email: string, code: string, newPassword: string) {
        const { data: reset } = await this.supabaseService.supabase
            .from('password_resets')
            .select('*')
            .eq('email', email)
            .eq('code', code)
            .eq('used', false)
            .single();

        if (!reset) {
            throw new Error('Código inválido');
        }

        if (new Date() > new Date(reset.expires_at)) {
            throw new Error('Código expirado');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.supabaseService.supabase
            .from('doctors')
            .update({ password: hashedPassword })
            .eq('email', email);

        await this.supabaseService.supabase
            .from('patients')
            .update({ password: hashedPassword, first_login: false })
            .eq('email', email);

        await this.supabaseService.supabase
            .from('password_resets')
            .update({ used: true })
            .eq('id', reset.id);

        return { message: 'Senha alterada com sucesso!' };
    }
}