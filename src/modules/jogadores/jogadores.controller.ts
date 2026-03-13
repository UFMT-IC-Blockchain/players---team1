import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get('stellar/:wallet')
  async findByStellarWallet(@Param('wallet') wallet: string) {
    const jogador = await this.jogadoresService.findByStellarWallet(wallet);

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogador;
  }
}
