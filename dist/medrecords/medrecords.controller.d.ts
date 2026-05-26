import { MedrecordsService } from './medrecords.service';
import { CreateMedrecordDto } from './dto/create-medrecord.dto';
import { UpdateMedrecordDto } from './dto/update-medrecord.dto';
export declare class MedrecordsController {
    private readonly medrecordsService;
    constructor(medrecordsService: MedrecordsService);
    create(createMedrecordDto: CreateMedrecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMedrecordDto: UpdateMedrecordDto): string;
    remove(id: string): string;
}
