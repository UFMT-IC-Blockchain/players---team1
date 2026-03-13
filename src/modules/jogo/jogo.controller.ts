import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Body,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JogoService } from './jogo.service';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { JogoDto } from './dto/jogo.dto';

@ApiTags('Jogos')
@Controller('jogo')
export class JogoController {
  constructor(private readonly jogosService: JogoService) {}

  @Get('all')
  @ApiOperation({ summary: 'Listar jogos' })
  @ApiOkResponse({ type: JogoDto, isArray: true })
  async findAll() {
    return await this.jogosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar jogo por id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: JogoDto })
  @ApiNotFoundResponse({ description: 'Jogo não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const jogo = await this.jogosService.findById(id);
    if (!jogo) {
      throw new NotFoundException('Jogo não encontrado');
    }
    return jogo;
  }

  @Post('criar')
  @ApiOperation({ summary: 'Criar jogo' })
  @ApiBody({ type: CreateJogoDto })
  @ApiCreatedResponse({ type: JogoDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  async create(@Body() body: CreateJogoDto) {
    return this.jogosService.create(body.duracao);
  }
}
