import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AccessCodesService } from './access-codes.service';
import { CreateAccessCodeDto } from './dto/create-access-code.dto';
import { ValidateAccessCodeDto } from './dto/validate-access-code.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('access-codes')
export class AccessCodesController {
    constructor(private readonly accessCodesService: AccessCodesService) { }

    @UseGuards(JwtGuard)
    @Post('request')
    request(@Body() createAccessCodeDto: CreateAccessCodeDto) {
        return this.accessCodesService.requestAccess(createAccessCodeDto);
    }

    @UseGuards(JwtGuard)
    @Post('validate')
    validate(@Body() validateAccessCodeDto: ValidateAccessCodeDto) {
        return this.accessCodesService.validateCode(validateAccessCodeDto);
    }
}
