import { UsuarioDto } from '../dto/usuario.dto';

export interface IUsuario {
  validaLogin(usuario: UsuarioDto): string;
}
