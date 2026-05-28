import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(private readonly supabaseService: SupabaseService) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendAccessCode(patientId: string, doctorName: string, code: string) {
    
    const { data: guardian } = await this.supabaseService.supabase
      .from('guardians')
      .select('email, name')
      .eq('patient_id', patientId)
      .single();

    let emailDestino = guardian?.email;
    let nomeDestino = guardian?.name;

    if (!emailDestino) {
      const { data: patient } = await this.supabaseService.supabase
        .from('patients')
        .select('email, name')
        .eq('id', patientId)
        .single();

      emailDestino = patient?.email;
      nomeDestino = patient?.name;
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
}