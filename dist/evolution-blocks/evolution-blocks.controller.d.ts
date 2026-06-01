import { EvolutionBlocksService } from './evolution-blocks.service';
import { CreateEvolutionBlockDto } from './dto/create-evolution-block.dto';
import { UpdateEvolutionBlockDto } from './dto/update-evolution-block.dto';
export declare class EvolutionBlocksController {
    private readonly evolutionBlocksService;
    constructor(evolutionBlocksService: EvolutionBlocksService);
    create(createEvolutionBlockDto: CreateEvolutionBlockDto, file?: Express.Multer.File): Promise<any>;
    findByEvolution(evolutionId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateEvolutionBlockDto: UpdateEvolutionBlockDto, file?: Express.Multer.File): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
