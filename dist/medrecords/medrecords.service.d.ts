import { CreateMedrecordDto } from './dto/create-medrecord.dto';
import { UpdateMedrecordDto } from './dto/update-medrecord.dto';
export declare class MedrecordsService {
    create(createMedrecordDto: CreateMedrecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMedrecordDto: UpdateMedrecordDto): string;
    remove(id: number): string;
}
