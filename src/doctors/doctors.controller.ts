import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.doctorsService.searchByName(name);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.doctorsService.update(id, updateDoctorDto, file);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}