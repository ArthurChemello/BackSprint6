import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    create(createDoctorDto: CreateDoctorDto): Promise<any>;
    findAll(): Promise<{
        id: any;
        name: any;
        email: any;
        specialty: any;
        crm: any;
        phone: any;
        profile_picture: any;
        created_at: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        name: any;
        email: any;
        specialty: any;
        crm: any;
        phone: any;
        profile_picture: any;
        created_at: any;
    }>;
    update(id: string, updateDoctorDto: UpdateDoctorDto, file?: Express.Multer.File): Promise<{
        id: any;
        name: any;
        email: any;
        specialty: any;
        crm: any;
        phone: any;
        profile_picture: any;
        created_at: any;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
