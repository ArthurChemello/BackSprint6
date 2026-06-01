import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly supabaseService;
    private readonly googleCalendarService;
    constructor(jwtService: JwtService, supabaseService: SupabaseService, googleCalendarService: GoogleCalendarService);
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
}
