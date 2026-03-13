import { TransacaoRecompensa } from '../entities/transacao-recompensa.entity';

export interface IRecompensasService {
  registerPayment(
    jogadorId: number,
    jogoId: number,
    valor: number,
  ): Promise<void>;

  updateTransactionHash(id: number, hash: string): Promise<void>;

  findByStatus(status: string): Promise<TransacaoRecompensa[]>;
}
