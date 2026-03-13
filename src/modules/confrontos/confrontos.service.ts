import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeJogo } from './entities/time-jogo.entity';
import {
  IConfrontosService,
  MatchWinnerResult,
} from './interfaces/confrontos-service.interface';

@Injectable()
export class ConfrontosService implements IConfrontosService {
  constructor(
    @InjectRepository(TimeJogo)
    private readonly timeJogoRepository: Repository<TimeJogo>,
  ) {}

  async registerMatchResult(
    jogoId: number,
    timeId: number,
    pontos: number,
  ): Promise<void> {
    if (!Number.isInteger(jogoId) || jogoId <= 0) {
      throw new BadRequestException('jogoId inválido');
    }

    if (!Number.isInteger(timeId) || timeId <= 0) {
      throw new BadRequestException('timeId inválido');
    }

    if (!Number.isInteger(pontos) || pontos < 0) {
      throw new BadRequestException('pontos inválido');
    }

    const existing = await this.timeJogoRepository.findOne({
      where: { idJogo: jogoId, idTime: timeId },
    });

    if (existing) {
      existing.pontuacao = pontos;
      existing.vencedor = false;
      await this.timeJogoRepository.save(existing);
      await this.recalculateWinners(jogoId);
      return;
    }

    const created = this.timeJogoRepository.create({
      idJogo: jogoId,
      idTime: timeId,
      pontuacao: pontos,
      vencedor: false,
    });

    await this.timeJogoRepository.save(created);
    await this.recalculateWinners(jogoId);
  }

  async getMatchWinner(jogoId: number): Promise<MatchWinnerResult> {
    if (!Number.isInteger(jogoId) || jogoId <= 0) {
      throw new BadRequestException('jogoId inválido');
    }

    const results = await this.timeJogoRepository.find({
      where: { idJogo: jogoId },
      order: { idTime: 'ASC' },
    });

    if (results.length === 0) {
      throw new NotFoundException('Nenhum resultado encontrado para este jogo');
    }

    const maxScore = Math.max(...results.map((r) => r.pontuacao ?? 0));
    const winners = results.filter((r) => (r.pontuacao ?? 0) === maxScore);

    if (winners.length !== 1) {
      return {
        jogoId,
        empate: true,
        vencedorTimeId: null,
        placares: results.map((r) => ({
          timeId: r.idTime,
          pontos: r.pontuacao,
        })),
      };
    }

    return {
      jogoId,
      empate: false,
      vencedorTimeId: winners[0].idTime,
      placares: results.map((r) => ({ timeId: r.idTime, pontos: r.pontuacao })),
    };
  }

  async getMatchResults(jogoId: number): Promise<TimeJogo[]> {
    if (!Number.isInteger(jogoId) || jogoId <= 0) {
      throw new BadRequestException('jogoId inválido');
    }

    return this.timeJogoRepository.find({
      where: { idJogo: jogoId },
      order: { idTime: 'ASC' },
    });
  }

  private async recalculateWinners(jogoId: number): Promise<void> {
    const results = await this.timeJogoRepository.find({
      where: { idJogo: jogoId },
    });

    if (results.length < 2) {
      return;
    }

    const maxScore = Math.max(...results.map((r) => r.pontuacao ?? 0));
    const winners = results.filter((r) => (r.pontuacao ?? 0) === maxScore);

    const isTie = winners.length !== 1;

    const updated = results.map((r) => ({
      ...r,
      vencedor: !isTie && r.idTime === winners[0]?.idTime,
    }));

    await this.timeJogoRepository.save(updated);
  }
}
