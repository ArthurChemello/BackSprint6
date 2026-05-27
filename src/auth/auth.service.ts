import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import * as  bcrypt from 'bcrypt';

@Injectable ()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly supabaseService: SupabaseService,
    ) {}

async loginDoctor(email: string, password: string) {
    const { data: doctor} = await this.supabaseService.supabase
    .from('doctors')
    .select('*')
    .eq('email', email)
    .single();

    if (!doctor){
        throw new UnauthorizedException('Credenciais inválidas');
    }

    const validPassword = await bcrypt.compare(password, doctor.password);

    if (!password){
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
    .from('patient')
    .select('*')
    .eq('email', email)
    .single();

    if (!patient){
        throw new UnauthorizedException('Credenciais inválidas');
    }
    const token = this.jwtService.sign({
        sub: patient.id,
        email: patient.email,
        role: 'patient',
    });
    return { token, patient  };
}
}