import { CreateAccessCodeDto } from './dto/create-access-code.dto';
import { ValidateAccessCodeDto } from './dto/validate-access-code.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { MailService } from '../mail/mail.service';
export declare class AccessCodesService {
    private readonly supabaseService;
    private readonly mailService;
    constructor(supabaseService: SupabaseService, mailService: MailService);
    requestAccess(createAccessCodeDto: CreateAccessCodeDto): Promise<{
        message: string;
    }>;
    validateCode(validateAccessCodeDto: ValidateAccessCodeDto): Promise<{
        message: string;
        data: any;
    }>;
}
