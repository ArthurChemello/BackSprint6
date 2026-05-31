import { Injectable } from '@nestjs/common';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { UpdateEvolutionDto } from './dto/update-evolution.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class EvolutionsService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async create(createEvolutionDto: CreateEvolutionDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .insert(createEvolutionDto)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByPatient(patientId: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .select('*, evolution_blocks(*), doctors(name, specialty)')
            .eq('patient_id', patientId)
            .order('date', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByDoctor(doctorId: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .select('*, evolution_blocks(*), patients(name)')
            .eq('doctor_id', doctorId) // ← era 'doctorId'
            .order('date', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findOne(id: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .select('*, evolution_blocks(*), patients(name), doctors(name, specialty)')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async update(id: string, updateEvolutionDto: UpdateEvolutionDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .update(updateEvolutionDto)
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
            .from('evolutions')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Evolução removida com sucesso!' };
    }

}
