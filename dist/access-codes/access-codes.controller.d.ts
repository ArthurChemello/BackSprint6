import { AccessCodesService } from './access-codes.service';
import { CreateAccessCodeDto } from './dto/create-access-code.dto';
import { ValidateAccessCodeDto } from './dto/validate-access-code.dto';
export declare class AccessCodesController {
    private readonly accessCodesService;
    constructor(accessCodesService: AccessCodesService);
    request(createAccessCodeDto: CreateAccessCodeDto): Promise<{
        message: string;
    }>;
    validate(validateAccessCodeDto: ValidateAccessCodeDto): Promise<{
        message: string;
        data: any;
    }>;
}
