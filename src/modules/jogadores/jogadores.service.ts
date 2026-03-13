import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from '../../../entities/Time';
import { Jogador } from './entities/jogador.entity';
import { IJogadoresService } from './interfaces/jogadores-service.interface';

@Injectable()
export class JogadoresService implements IJogadoresService {
  constructor(
    @InjectRepository(Jogador)
    private readonly jogadorRepository: Repository<Jogador>,
  ) {}

  async findByStellarWallet(wallet: string): Promise<Jogador | null> {
    const normalizedWallet = wallet.trim();

    if (normalizedWallet.length !== 56 || !normalizedWallet.startsWith('G')) {
      throw new BadRequestException('Endereço Stellar inválido');
    }

    return await this.jogadorRepository.findOne({
      where: { carteiraStellar: normalizedWallet },
    });
  }

  async assignToTime(jogadorId: number, timeId: number): Promise<void> {
    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      throw new BadRequestException('jogadorId inválido');
    }

    if (!Number.isInteger(timeId) || timeId <= 0) {
      throw new BadRequestException('timeId inválido');
    }

    const jogador = await this.jogadorRepository.findOne({
      where: { id: jogadorId },
    });

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }

    const time = await this.jogadorRepository.manager.findOne(Time, {
      where: { id: timeId },
    });

    if (!time) {
      throw new NotFoundException('Time não encontrado');
    }

    jogador.idTime = time;
    await this.jogadorRepository.save(jogador);
  }
}
