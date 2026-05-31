import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EvolutionsService } from './evolutions.service';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { UpdateEvolutionDto } from './dto/update-evolution.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('evolutions')
export class EvolutionsController {
    constructor(private readonly evolutionsService: EvolutionsService) { }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createEvolutionDto: CreateEvolutionDto) {
        return this.evolutionsService.create(createEvolutionDto);
    }

    @UseGuards(JwtGuard)
    @Get('patient/:patientId')
    findByPatient(@Param('patientId') patientId: string) {
        return this.evolutionsService.findByPatient(patientId);
    }

    @UseGuards(JwtGuard)
    @Get('doctor/:doctorId')
    findByDoctor(@Param('doctorId') doctorId: string) {
        return this.evolutionsService.findByDoctor(doctorId);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.evolutionsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEvolutionDto: UpdateEvolutionDto) {
        return this.evolutionsService.update(id, updateEvolutionDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.evolutionsService.remove(id);
    }
}
