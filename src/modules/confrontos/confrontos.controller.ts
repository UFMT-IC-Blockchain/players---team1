import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConfrontosService } from './confrontos.service';

@Controller('confrontos')
export class ConfrontosController {
  constructor(private readonly confrontosService: ConfrontosService) {}

  @Post(':jogoId/result')
  async registerMatchResult(
    @Param('jogoId', ParseIntPipe) jogoId: number,
    @Body('timeId', ParseIntPipe) timeId: number,
    @Body('pontos', ParseIntPipe) pontos: number,
  ) {
    await this.confrontosService.registerMatchResult(jogoId, timeId, pontos);
    return { ok: true };
  }

  @Get(':jogoId/results')
  async getMatchResults(@Param('jogoId', ParseIntPipe) jogoId: number) {
    return this.confrontosService.getMatchResults(jogoId);
  }

  @Get(':jogoId/winner')
  async getMatchWinner(@Param('jogoId', ParseIntPipe) jogoId: number) {
    return this.confrontosService.getMatchWinner(jogoId);
  }
}
