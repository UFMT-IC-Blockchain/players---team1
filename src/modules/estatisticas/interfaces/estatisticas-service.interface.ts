export interface IEstatisticasService {
  registerStats(
    jogadorId: number,
    jogoId: number,
    pontos: number,
  ): Promise<void>;
  getTopScorers(limit: number): Promise<any[]>;
}
