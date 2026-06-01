import { Injectable } from '@nestjs/common';
import { CreateAccessCodeDto } from './dto/create-access-code.dto';
import { ValidateAccessCodeDto } from './dto/validate-access-code.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AccessCodesService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly mailService: MailService,
    ) { }

    async requestAccess(createAccessCodeDto: CreateAccessCodeDto) {
        const { data: doctor } = await this.supabaseService.supabase
            .from('doctors')
            .select('name')
            .eq('id', createAccessCodeDto.doctor_id)
            .single();

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

        const { data, error } = await this.supabaseService.supabase
            .from('access_codes')
            .insert({
                doctor_id: createAccessCodeDto.doctor_id,
                patient_id: createAccessCodeDto.patient_id,
                code,
                expires_at,
                used: false,
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        await this.mailService.sendAccessCode(
            createAccessCodeDto.patient_id,
            doctor.name,
            code,
        );

        return { message: 'Código enviado com sucesso!' };
    }

    async validateCode(validateAccessCodeDto: ValidateAccessCodeDto) {
        const { data: accessCode } = await this.supabaseService.supabase
            .from('access_codes')
            .select('*')
            .eq('doctor_id', validateAccessCodeDto.doctor_id)
            .eq('code', validateAccessCodeDto.code)
            .eq('used', false)
            .single();

        if (!accessCode) {
            throw new Error('Código inválido!');
        }

        if (new Date() > new Date(accessCode.expires_at)) {
            throw new Error('Código expirado!');
        }

        await this.supabaseService.supabase
            .from('access_codes')
            .update({ used: true })
            .eq('id', accessCode.id);

        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .upsert({
                doctor_id: validateAccessCodeDto.doctor_id,
                patient_id: accessCode.patient_id,
                access_type: 'full',
                status: 'active',
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Acesso liberado com sucesso!', data };
    }
}
