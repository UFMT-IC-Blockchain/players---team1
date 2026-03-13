import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Timeservice } from './times.service';

@Controller('times')
export class TimesController {
    constructor(private readonly timesService: Timeservice) { }


    @Get()
    async findAll() {
        return this.timesService.findAll();
    }

    @Get('/:id')
    async findTeam(
        @Param('id', ParseIntPipe) timeId: number,

    ) {
        const findfulltime = await this.timesService.findFullTime(timeId);
        return { findfulltime };
    }
}