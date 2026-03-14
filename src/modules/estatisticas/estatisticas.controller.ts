import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @Get('top-scorers/:limit')
  async getTopScorers(@Param('limit', ParseIntPipe) limit: number) {
    return this.estatisticasService.getTopScorers(limit);
  }
}
