import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';

@Injectable()
export class AppointmentsService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly googleCalendarService: GoogleCalendarService,
    ) { }

    async create(createAppointmentDto: CreateAppointmentDto) {
        const { data: patient } = await this.supabaseService.supabase
            .from('patients')
            .select('name, email')
            .eq('id', createAppointmentDto.patient_id)
            .single();

        const { data: tokens } = await this.supabaseService.supabase
            .from('google_tokens')
            .select('access_token, refresh_token')
            .eq('doctor_id', createAppointmentDto.doctor_id)
            .single();

        let google_event_id = null;

        if (tokens && patient?.email) {
            google_event_id = await this.googleCalendarService.createEvent(
                tokens.access_token,
                tokens.refresh_token,
                {
                    title: createAppointmentDto.title,
                    date: createAppointmentDto.date,
                    startTime: createAppointmentDto.start_time,
                    endTime: createAppointmentDto.end_time,
                    patientName: patient.name,
                    patientEmail: patient.email,
                },
            );
        }

        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .insert({
                ...createAppointmentDto,
                google_event_id,
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findAll() {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, patients(name), doctors(name)');

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByDoctor(doctorId: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, patients(name, email)')
            .eq('doctor_id', doctorId);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByPatient(patientId: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, doctors(name, phone, specialty, profile_picture)')
            .eq('patient_id', patientId);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findOne(id: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, patients(name, email), doctors(name, phone, specialty, profile_picture)')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .update(updateAppointmentDto)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async remove(id: string) {
        const { data: appointment } = await this.supabaseService.supabase
            .from('appointments')
            .select('google_event_id, doctor_id')
            .eq('id', id)
            .single();

        if (appointment?.google_event_id) {
            const { data: tokens } = await this.supabaseService.supabase
                .from('google_tokens')
                .select('access_token, refresh_token')
                .eq('doctor_id', appointment.doctor_id)
                .single();

            if (tokens) {
                await this.googleCalendarService.deletEvent(
                    tokens.access_token,
                    tokens.refresh_token,
                    appointment.google_event_id,
                );
            }
        }

        const { error } = await this.supabaseService.supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message)
        }
        return { message: 'Consulta removida com sucesso!' }
    }
}