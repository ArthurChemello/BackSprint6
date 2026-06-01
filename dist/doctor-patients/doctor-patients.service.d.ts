import { CreateDoctorPatientDto } from './dto/create-doctor-patient.dto';
import { UpdateDoctorPatientDto } from './dto/update-doctor-patient.dto';
import { SupabaseService } from '../supabase/supabase.service';
export declare class DoctorPatientsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createDoctorPatientDto: CreateDoctorPatientDto): Promise<any>;
    findByDoctor(doctorId: string): Promise<any[]>;
    findByPatient(patient_id: string): Promise<any[]>;
    update(id: string, updateDoctorPatientDto: UpdateDoctorPatientDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
