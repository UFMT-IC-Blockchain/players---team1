import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash, timingSafeEqual } from 'crypto';
import { ILike, Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';

type ValidatedUser = {
  id: number;
  login: string;
  roles: string[];
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  private isAuthDebugEnabled() {
    return process.env.AUTH_DEBUG === '1' || process.env.NODE_ENV !== 'production';
  }

  private debug(message: string, meta?: Record<string, unknown>) {
    if (!this.isAuthDebugEnabled()) {
      return;
    }

    if (!meta) {
      this.logger.debug(message);
      return;
    }

    this.logger.debug(`${message} ${JSON.stringify(meta)}`);
  }

  private normalizeStoredPasswordHash(stored: string | null | undefined) {
    const raw = stored?.trim();
    if (!raw) {
      return null;
    }

    if (raw.startsWith('$2y$')) {
      return `$2b$${raw.slice(4)}`;
    }

    return raw;
  }

  private isSha256Hex(hash: string) {
    return /^[0-9a-f]{64}$/i.test(hash);
  }

  private safeEqual(a: string, b: string) {
    const aBuf = Buffer.from(a);
    const bBuf = Buffer.from(b);

    if (aBuf.length !== bBuf.length) {
      return false;
    }

    return timingSafeEqual(aBuf, bBuf);
  }

  async validateUser(login: string, pass: string): Promise<ValidatedUser | null> {
    const normalizedLogin = login?.trim();
    const password = typeof pass === 'string' ? pass : '';

    if (!normalizedLogin || !password) {
      this.debug('validateUser:invalid-input', {
        hasLogin: !!normalizedLogin,
        passwordLength: password.length,
      });
      return null;
    }

    this.debug('validateUser:start', {
      login: normalizedLogin,
      loginLength: normalizedLogin.length,
      passwordLength: password.length,
    });

    const user = await this.usuarioRepository.findOne({
      where: { login: ILike(normalizedLogin) },
      relations: { roles: true },
    });

    if (!user) {
      this.debug('validateUser:user-not-found', { login: normalizedLogin });
      return null;
    }

    const storedHash = this.normalizeStoredPasswordHash(user.senha);
    if (!storedHash) {
      this.debug('validateUser:missing-hash', { userId: user.id, login: user.login });
      return null;
    }

    const bcryptInfoMatch = /^\$2([aby])\$(\d\d)\$/.exec(storedHash);
    this.debug('validateUser:hash-info', {
      userId: user.id,
      hashLength: storedHash.length,
      bcryptVariant: bcryptInfoMatch?.[1],
      bcryptCost: bcryptInfoMatch?.[2],
    });

    let ok = false;
    try {
      this.debug('validateUser:compare:start', { userId: user.id });
      if (bcryptInfoMatch) {
        this.debug('validateUser:hash-type', { userId: user.id, type: 'bcrypt' });
        ok = await bcrypt.compare(password, storedHash);
      } else if (this.isSha256Hex(storedHash)) {
        this.debug('validateUser:hash-type', { userId: user.id, type: 'sha256' });
        const sha256 = createHash('sha256').update(password, 'utf8').digest('hex');
        ok = this.safeEqual(sha256.toLowerCase(), storedHash.toLowerCase());

        if (ok) {
          const upgraded = await bcrypt.hash(password, 10);
          await this.usuarioRepository.update(user.id, { senha: upgraded });
          this.debug('validateUser:hash-upgraded', { userId: user.id, to: 'bcrypt' });
        }
      } else {
        this.debug('validateUser:hash-type', { userId: user.id, type: 'unknown' });
        return null;
      }
      this.debug('validateUser:compare:result', { userId: user.id, ok });
    } catch (e) {
      this.debug('validateUser:compare:error', {
        userId: user.id,
        errorName: e instanceof Error ? e.name : 'unknown',
        errorMessage: e instanceof Error ? e.message : 'unknown',
      });
      return null;
    }

    if (!ok) {
      this.debug('validateUser:invalid-password', { userId: user.id });
      return null;
    }

    this.debug('validateUser:success', { userId: user.id, login: user.login });
    return {
      id: user.id,
      login: user.login,
      roles: (user.roles ?? []).map((r) => r.nome),
    };
  }

  async login(user: ValidatedUser) {
    const payload = {
      sub: user.id,
      login: user.login,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
