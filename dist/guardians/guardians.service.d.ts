import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
import { SupabaseService } from '../supabase/supabase.service';
export declare class GuardiansService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createGuardianDto: CreateGuardianDto): Promise<any>;
    findByPatient(patientId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateGuardianDto: UpdateGuardianDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
