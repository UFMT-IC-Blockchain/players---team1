import { Jogador } from '../entities/jogador.entity';

export interface IJogadoresService {
  findByStellarWallet(wallet: string): Promise<Jogador | null>;
  assignToTime(jogadorId: number, timeId: number): Promise<void>;
}
