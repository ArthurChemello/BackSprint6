import { EvolutionsService } from './evolutions.service';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { UpdateEvolutionDto } from './dto/update-evolution.dto';
export declare class EvolutionsController {
    private readonly evolutionsService;
    constructor(evolutionsService: EvolutionsService);
    create(createEvolutionDto: CreateEvolutionDto): Promise<any>;
    findByPatient(patientId: string, doctorId: string): Promise<any[]>;
    findByDoctor(doctorId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateEvolutionDto: UpdateEvolutionDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
