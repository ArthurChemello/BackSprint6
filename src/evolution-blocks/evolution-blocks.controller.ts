import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EvolutionBlocksService } from './evolution-blocks.service';
import { CreateEvolutionBlockDto } from './dto/create-evolution-block.dto';
import { UpdateEvolutionBlockDto } from './dto/update-evolution-block.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('evolution-blocks')
export class EvolutionBlocksController {
    constructor(private readonly evolutionBlocksService: EvolutionBlocksService) { }

    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Body() createEvolutionBlockDto: CreateEvolutionBlockDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.evolutionBlocksService.create(createEvolutionBlockDto, file);
    }

    @UseGuards(JwtGuard)
    @Get('evolution/:evolutionId')
    findByEvolution(@Param('evolutionId') evolutionId: string) {
        return this.evolutionBlocksService.findByEvolution(evolutionId);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.evolutionBlocksService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    update(
        @Param('id') id: string,
        @Body() updateEvolutionBlockDto: UpdateEvolutionBlockDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.evolutionBlocksService.update(id, updateEvolutionBlockDto, file);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.evolutionBlocksService.remove(id);
    }
}
