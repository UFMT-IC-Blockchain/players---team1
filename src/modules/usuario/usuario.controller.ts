import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dto/usuario.dto';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'Usuário já existe.' })
  @UsePipes(new ValidationPipe())
  async create(@Body() createUsuarioDto: UsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
}
