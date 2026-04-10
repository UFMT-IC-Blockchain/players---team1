import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Timeservice } from './times.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('times')
export class TimesController {
    constructor(private readonly timesService: Timeservice) { }

    @Get()
    async findAll() {
        return this.timesService.findAll();
    }

    @Post()
    async create(@Body('nome') nome: string) {
        return this.timesService.create(nome);
    }

    @Get('/:id')
    async findTeam(@Param('id', ParseIntPipe) timeId: number) {
        const findfulltime = await this.timesService.findFullTime(timeId);
        return { findfulltime };
    }

    @Patch('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body('nome') nome: string) {
        return this.timesService.update(id, nome);
    }

    @Delete('/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.timesService.remove(id);
        return { ok: true };
    }
}