import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from '../times/entities/Time';
import { Jogador } from './entities/jogador.entity';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectRepository(Jogador)
    private readonly jogadorRepository: Repository<Jogador>,
  ) {}

  async findAll(): Promise<Jogador[]> {
    return this.jogadorRepository.find({ relations: ['idTime'] });
  }

  async create(nome: string, wallet: string, timeId?: number): Promise<Jogador> {
    const jogador = this.jogadorRepository.create({
      nome,
      carteiraStellar: wallet.trim(),
    });

    if (timeId) {
      jogador.idTime = { id: timeId } as Time;
    }

    return this.jogadorRepository.save(jogador);
  }

  async update(id: number, data: { nome?: string; carteiraStellar?: string; idTime?: number }): Promise<Jogador> {
    const jogador = await this.jogadorRepository.findOne({ where: { id } });
    if (!jogador) throw new NotFoundException('Jogador não encontrado');

    if (data.nome) jogador.nome = data.nome;
    if (data.carteiraStellar) jogador.carteiraStellar = data.carteiraStellar.trim();
    if (data.idTime) jogador.idTime = { id: data.idTime } as Time;

    return this.jogadorRepository.save(jogador);
  }

  async remove(id: number): Promise<void> {
    const jogador = await this.jogadorRepository.findOne({ where: { id } });
    if (!jogador) throw new NotFoundException('Jogador não encontrado');
    await this.jogadorRepository.remove(jogador);
  }

  async findByStellarWallet(wallet: string): Promise<Jogador | null> {
    const normalizedWallet = wallet.trim();
    return await this.jogadorRepository.findOne({
      where: { carteiraStellar: normalizedWallet },
      relations: ['idTime']
    });
  }

  async assignToTime(jogadorId: number, timeId: number): Promise<void> {
    const jogador = await this.jogadorRepository.findOne({ where: { id: jogadorId } });
    if (!jogador) throw new NotFoundException('Jogador não encontrado');
    jogador.idTime = { id: timeId } as Time;
    await this.jogadorRepository.save(jogador);
  }
}
