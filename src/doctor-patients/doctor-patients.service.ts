import { Injectable } from '@nestjs/common';
import { CreateDoctorPatientDto } from './dto/create-doctor-patient.dto';
import { UpdateDoctorPatientDto } from './dto/update-doctor-patient.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class DoctorPatientsService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async create(createDoctorPatientDto: CreateDoctorPatientDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .insert({
                ...createDoctorPatientDto,
                status: 'pending',
                access_type: createDoctorPatientDto.access_type ?? 'emergency',
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByDoctor(doctorId: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .select('*, patients(name, email, phone)')
            .eq('doctor_id', doctorId);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByPatient(patient_id: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .select('*, doctors(name, specialty, phone, profile_picture)')
            .eq('patient_id', patient_id);

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async update(id: string, updateDoctorPatientDto: UpdateDoctorPatientDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .update(updateDoctorPatientDto)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async remove(id: string) {
        const { error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Vínculo removido com sucesso!' };
    }
}
