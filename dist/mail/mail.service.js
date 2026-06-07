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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const supabase_service_1 = require("../supabase/supabase.service");
let MailService = class MailService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async sendAccessCode(patientId, doctorName, code) {
        const { data: guardian } = await this.supabaseService.supabase
            .from('guardians')
            .select('email, name')
            .eq('patient_id', patientId)
            .single();
        let emailDestino = guardian === null || guardian === void 0 ? void 0 : guardian.email;
        let nomeDestino = guardian === null || guardian === void 0 ? void 0 : guardian.name;
        if (!emailDestino) {
            const { data: patient } = await this.supabaseService.supabase
                .from('patients')
                .select('email, name')
                .eq('id', patientId)
                .single();
            emailDestino = patient === null || patient === void 0 ? void 0 : patient.email;
            nomeDestino = patient === null || patient === void 0 ? void 0 : patient.name;
        }
        if (!emailDestino) {
            throw new Error('Paciente não possui email cadastrado');
        }
        await this.resend.emails.send({
            from: 'Lume System <onboarding@resend.dev>',
            to: emailDestino,
            subject: 'Código de acesso ao seu prontuário',
            html: `
        <h2>Olá, ${nomeDestino}!</h2>
        <p>O médico <strong>${doctorName}</strong> está solicitando acesso ao seu prontuário no Lume System.</p>
        <p>Seu código de acesso é:</p>
        <h1 style="letter-spacing: 8px; color: #333;">${code}</h1>
        <p>Este código expira em <strong>24 horas</strong>.</p>
        <p>Passe este código para o médico pessoalmente ou por mensagem.</p>
        <br/>
        <p style="color: #999; font-size: 12px;">Se você não reconhece essa solicitação, ignore este email.</p>
      `,
        });
    }
    async sendPasswordReset(to, code) {
        await this.resend.emails.send({
            from: 'Lume System <onboarding@resend.dev>',
            to,
            subject: 'Redefinição de senha',
            html: `
          <h2>Redefinição de senha</h2>
          <p>Seu código para redefinir a senha é:</p>
          <h1 style="letter-spacing: 8px; color: #333;">${code}</h1>
          <p>Este código expira em <strong>1 hora</strong>.</p>
          <p style="color: #999; font-size: 12px;">Se você não solicitou a redefinição de senha, ignore este email.</p>
      `,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], MailService);
//# sourceMappingURL=mail.service.js.map