import { IUsuario } from './interfaces/usuario.interface';
import { UsuarioDto } from './dto/usuario.dto';

export class UsuarioService implements IUsuario {
  validaLogin(usuario: UsuarioDto): string {
    void usuario;
    throw new Error('Method not implemented.');
  }
}
