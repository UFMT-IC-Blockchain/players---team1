import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jogo } from './entities/jogo.entity';
import { IJogo } from './interface/jogo.interface';

@Injectable()
export class JogoService implements IJogo {
  constructor(
    @InjectRepository(Jogo)
    private readonly JogoRepo: Repository<Jogo>,
  ) {}

  async findById(id: number): Promise<Jogo | null> {
    return await this.JogoRepo.findOne({ where: { id: id } });
  }

  async findAll(): Promise<Jogo[]> {
    return await this.JogoRepo.find();
  }

  async create(duracao: number): Promise<Jogo> {
    const jogo = this.JogoRepo.create({ duracao });
    return this.JogoRepo.save(jogo);
  }
}
