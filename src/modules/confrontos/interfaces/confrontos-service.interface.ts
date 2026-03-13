export type MatchScore = {
  timeId: number;
  pontos: number;
};

export type MatchWinnerResult = {
  jogoId: number;
  empate: boolean;
  vencedorTimeId: number | null;
  placares: MatchScore[];
};

export interface IConfrontosService {
  registerMatchResult(
    jogoId: number,
    timeId: number,
    pontos: number,
  ): Promise<void>;

  getMatchWinner(jogoId: number): Promise<MatchWinnerResult>;
}
