import { Jogo } from '../entities/jogo.entity';
export interface IJogo {
  findById(id: number): Promise<Jogo | null>;
  findAll(): Promise<Jogo[] | null>;
  create(duracao: number): Promise<Jogo>;
}
