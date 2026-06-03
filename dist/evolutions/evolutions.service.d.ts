import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { UpdateEvolutionDto } from './dto/update-evolution.dto';
import { SupabaseService } from '../supabase/supabase.service';
export declare class EvolutionsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createEvolutionDto: CreateEvolutionDto): Promise<any>;
    findByPatient(patientId: string, doctorId: string): Promise<any[]>;
    findByDoctor(doctorId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateEvolutionDto: UpdateEvolutionDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
