import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: UsuarioDto): Promise<Usuario> {
    const { login, senha } = createUsuarioDto;

    const existingUser = await this.usuarioRepository.findOneBy({ login });
    if (existingUser) {
      throw new ConflictException('Usuário já existe');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(senha, salt);

    const usuario = this.usuarioRepository.create({
      login,
      senha: hashedPassword,
    });

    return this.usuarioRepository.save(usuario);
  }

  validaLogin(usuario: UsuarioDto): string {
    const login = usuario.login?.trim();
    const senha = usuario.senha?.trim();

    if (!login || !senha) {
      return 'Dados inválidos';
    }

    return 'OK';
  }
}
