import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly supabaseService;
    private readonly googleCalendarService;
    private readonly mailService;
    constructor(jwtService: JwtService, supabaseService: SupabaseService, googleCalendarService: GoogleCalendarService, mailService: MailService);
    loginDoctor(email: string, password: string): Promise<{
        token: string;
        doctor: any;
    }>;
    loginPatient(email: string, password: string): Promise<{
        token: string;
        patient: any;
    }>;
    getGoogleAuthUrl(doctorId: string): any;
    handleGoogleCallback(code: string, doctorId: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, code: string, newPassword: string): Promise<{
        message: string;
    }>;
}
