import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('search')
  searchByName(
    @Query('name') name: string,
    @Query('doctorId') doctorId: string,
  ) {
    return this.patientsService.searchByName(name, doctorId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @UseGuards(JwtGuard)
  @Get('search/doctor/:doctorId')
  searchByNameForDoctor(
    @Param('doctorId') doctorId: string,
    @Query('name') name: string,
  ) {
    return this.patientsService.searchByNameForDoctor(name, doctorId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}