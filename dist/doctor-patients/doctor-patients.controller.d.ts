import { DoctorPatientsService } from './doctor-patients.service';
import { CreateDoctorPatientDto } from './dto/create-doctor-patient.dto';
import { UpdateDoctorPatientDto } from './dto/update-doctor-patient.dto';
export declare class DoctorPatientsController {
    private readonly doctorPatientsService;
    constructor(doctorPatientsService: DoctorPatientsService);
    create(createDoctorPatientDto: CreateDoctorPatientDto): Promise<any>;
    findByDoctor(doctorId: string): Promise<any[]>;
    findByPatient(patientId: string): Promise<any[]>;
    update(id: string, updateDoctorPatientDto: UpdateDoctorPatientDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
