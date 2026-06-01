import { SupabaseService } from '../supabase/supabase.service';
export declare class MailService {
    private readonly supabaseService;
    private resend;
    constructor(supabaseService: SupabaseService);
    sendAccessCode(patientId: string, doctorName: string, code: string): Promise<void>;
}
