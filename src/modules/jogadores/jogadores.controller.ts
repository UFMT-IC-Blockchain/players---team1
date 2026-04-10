import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JogadoresService } from './jogadores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Jogadores')
@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get()
  async findAll() {
    return this.jogadoresService.findAll();
  }

  @Post()
  async create(@Body() body: { nome: string; carteiraStellar: string; idTime?: number }) {
    return this.jogadoresService.create(body.nome, body.carteiraStellar, body.idTime);
  }

  @Get('stellar/:wallet')
  async findByStellarWallet(@Param('wallet') wallet: string) {
    const jogador = await this.jogadoresService.findByStellarWallet(wallet);
    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }
    return jogador;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { nome?: string; carteiraStellar?: string; idTime?: number }) {
    return this.jogadoresService.update(Number(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.jogadoresService.remove(Number(id));
    return { ok: true };
  }
}
