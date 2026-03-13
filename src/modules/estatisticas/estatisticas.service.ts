import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JogadorJogo } from './entities/jogador-jogo.entity';
import { IEstatisticasService } from './interfaces/estatisticas-service.interface';

@Injectable()
export class EstatisticasService implements IEstatisticasService {
  constructor(
    @InjectRepository(JogadorJogo)
    private readonly jogadorJogoRepository: Repository<JogadorJogo>,
  ) {}

  async registerStats(
    jogadorId: number,
    jogoId: number,
    pontos: number,
  ): Promise<void> {
    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      throw new BadRequestException('jogadorId inválido');
    }

    if (!Number.isInteger(jogoId) || jogoId <= 0) {
      throw new BadRequestException('jogoId inválido');
    }

    if (!Number.isInteger(pontos) || pontos < 0) {
      throw new BadRequestException('pontos inválido');
    }

    const existing = await this.jogadorJogoRepository.findOne({
      where: { idJogador: jogadorId, idJogo: jogoId },
    });

    if (existing) {
      existing.pontosMarcados = pontos;
      await this.jogadorJogoRepository.save(existing);
      return;
    }

    const created = this.jogadorJogoRepository.create({
      idJogador: jogadorId,
      idJogo: jogoId,
      pontosMarcados: pontos,
    });

    await this.jogadorJogoRepository.save(created);
  }

  async getTopScorers(limit: number): Promise<any[]> {
    if (!Number.isInteger(limit) || limit <= 0) {
      throw new BadRequestException('limit inválido');
    }

    return this.jogadorJogoRepository
      .createQueryBuilder('jj')
      .innerJoin('jj.idJogador2', 'j')
      .select('j.id', 'jogadorId')
      .addSelect('j.nome', 'nome')
      .addSelect('SUM(COALESCE(jj.pontosMarcados, 0))', 'pontos')
      .groupBy('j.id')
      .addGroupBy('j.nome')
      .orderBy('SUM(COALESCE(jj.pontosMarcados, 0))', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}
