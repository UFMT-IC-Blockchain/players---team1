import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RecompensasService } from './recompensas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('recompensas')
export class RecompensasController {
  constructor(private readonly recompensasService: RecompensasService) {}

  @Get('jogador/:jogadorId')
  async findByJogadorId(@Param('jogadorId') jogadorId: string) {
    return this.recompensasService.findByJogadorId(Number(jogadorId));
  }

  @Get('jogo/:jogoId')
  async findByJogoId(@Param('jogoId') jogoId: string) {
    return this.recompensasService.findByJogoId(Number(jogoId));
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: string) {
    return this.recompensasService.findByStatus(status);
  }

  @Get()
  async findByStatusQuery(@Query('status') status?: string) {
    return this.recompensasService.findByStatus(status ?? '');
  }
}
