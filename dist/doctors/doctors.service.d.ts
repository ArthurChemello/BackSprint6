import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorsService {
    create(createDoctorDto: CreateDoctorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDoctorDto: UpdateDoctorDto): string;
    remove(id: number): string;
}
