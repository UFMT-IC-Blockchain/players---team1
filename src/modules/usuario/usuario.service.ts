import { IUsuario } from './interfaces/usuario.interface';
import { UsuarioDto } from './dto/usuario.dto';

export class UsuarioService implements IUsuario {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validaLogin(_usuario: UsuarioDto): string {
    throw new Error('Method not implemented.');
  }
}
