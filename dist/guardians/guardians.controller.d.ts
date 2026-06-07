import { GuardiansService } from './guardians.service';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
export declare class GuardiansController {
    private readonly guardiansService;
    constructor(guardiansService: GuardiansService);
    create(createGuardianDto: CreateGuardianDto): Promise<any>;
    findByPatient(patientId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateGuardianDto: UpdateGuardianDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
