import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';

@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @Get('top-scorers/:limit')
  async getTopScorers(@Param('limit', ParseIntPipe) limit: number) {
    return this.estatisticasService.getTopScorers(limit);
  }
}
