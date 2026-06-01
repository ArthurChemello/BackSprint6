"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessCodesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const mail_service_1 = require("../mail/mail.service");
let AccessCodesService = class AccessCodesService {
    constructor(supabaseService, mailService) {
        this.supabaseService = supabaseService;
        this.mailService = mailService;
    }
    async requestAccess(createAccessCodeDto) {
        const { data: doctor } = await this.supabaseService.supabase
            .from('doctors')
            .select('name')
            .eq('id', createAccessCodeDto.doctor_id)
            .single();
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
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
        await this.mailService.sendAccessCode(createAccessCodeDto.patient_id, doctor.name, code);
        return { message: 'Código enviado com sucesso!' };
    }
    async validateCode(validateAccessCodeDto) {
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
};
exports.AccessCodesService = AccessCodesService;
exports.AccessCodesService = AccessCodesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        mail_service_1.MailService])
], AccessCodesService);
//# sourceMappingURL=access-codes.service.js.map