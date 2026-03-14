import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JogadoresService } from './jogadores.service';
import { JogadorDto } from './dto/jogador.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('Jogadores')
@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get('stellar/:wallet')
  @ApiOperation({ summary: 'Buscar jogador por carteira Stellar' })
  @ApiParam({
    name: 'wallet',
    description: 'Endereço Stellar (56 caracteres, começa com G)',
  })
  @ApiOkResponse({ type: JogadorDto })
  @ApiNotFoundResponse({ description: 'Jogador não encontrado' })
  @ApiBadRequestResponse({ description: 'Endereço Stellar inválido' })
  async findByStellarWallet(@Param('wallet') wallet: string) {
    const jogador = await this.jogadoresService.findByStellarWallet(wallet);

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogador;
  }
}
