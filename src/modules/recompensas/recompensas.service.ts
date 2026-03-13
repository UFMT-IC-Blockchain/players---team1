import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jogador } from '../jogadores/entities/jogador.entity';
import { Jogo } from '../jogo/entities/jogo.entity';
import { TransacaoRecompensa } from './entities/transacao-recompensa.entity';
import { IRecompensasService } from './interfaces/recompensas-service.interface';

@Injectable()
export class RecompensasService implements IRecompensasService {
  constructor(
    @InjectRepository(TransacaoRecompensa)
    private readonly transacaoRecompensaRepository: Repository<TransacaoRecompensa>,
  ) {}

  async registerPayment(
    jogadorId: number,
    jogoId: number,
    valor: number,
  ): Promise<void> {
    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      throw new BadRequestException('jogadorId inválido');
    }

    if (!Number.isInteger(jogoId) || jogoId <= 0) {
      throw new BadRequestException('jogoId inválido');
    }

    const valorPago = this.formatValorPago(valor);

    const created = this.transacaoRecompensaRepository.create({
      valorPago,
      status: 'PENDENTE',
      idJogador: { id: jogadorId } as Jogador,
      idJogo: { id: jogoId } as Jogo,
    });

    await this.transacaoRecompensaRepository.save(created);
  }

  async updateTransactionHash(id: number, hash: string): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('id inválido');
    }

    const normalizedHash = hash.trim();

    if (normalizedHash.length !== 64) {
      throw new BadRequestException('hash inválido');
    }

    const transacao = await this.transacaoRecompensaRepository.findOne({
      where: { id },
    });

    if (!transacao) {
      throw new NotFoundException('Transação não encontrada');
    }

    transacao.hashTransacao = normalizedHash;
    transacao.status = 'CONFIRMADA';

    await this.transacaoRecompensaRepository.save(transacao);
  }

  async findByStatus(status: string): Promise<TransacaoRecompensa[]> {
    const normalizedStatus = status.trim().toUpperCase();

    if (normalizedStatus.length === 0) {
      throw new BadRequestException('status inválido');
    }

    return await this.transacaoRecompensaRepository.find({
      where: { status: normalizedStatus },
      order: { dataRegistro: 'DESC' },
    });
  }

  async findByJogadorId(jogadorId: number): Promise<TransacaoRecompensa[]> {
    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      throw new BadRequestException('jogadorId inválido');
    }

    return await this.transacaoRecompensaRepository.find({
      where: { idJogador: { id: jogadorId } },
      order: { dataRegistro: 'DESC' },
      relations: { idJogador: true, idJogo: true },
    });
  }

  async findByJogoId(jogoId: number): Promise<TransacaoRecompensa[]> {
    if (!Number.isInteger(jogoId) || jogoId <= 0) {
      throw new BadRequestException('jogoId inválido');
    }

    return await this.transacaoRecompensaRepository.find({
      where: { idJogo: { id: jogoId } },
      order: { dataRegistro: 'DESC' },
      relations: { idJogador: true, idJogo: true },
    });
  }

  private formatValorPago(valor: number): string {
    if (!Number.isFinite(valor) || valor < 0) {
      throw new BadRequestException('valor inválido');
    }

    const fixed = valor.toFixed(7);
    return fixed === '-0.0000000' ? '0.0000000' : fixed;
  }
}
