import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Jogador } from "../src/modules/jogadores/entities/jogador.entity";
import { Jogo } from "../src/modules/jogo/entities/jogo.entity";

@Index("jogador_jogo_pkey", ["idJogador", "idJogo"], { unique: true })
@Entity("jogador_jogo", { schema: "public" })
export class JogadorJogo {
  @Column("integer", { primary: true, name: "id_jogador" })
  idJogador: number;

  @Column("integer", { primary: true, name: "id_jogo" })
  idJogo: number;

  @Column("integer", {
    name: "pontos_marcados",
    nullable: true,
    default: () => "0",
  })
  pontosMarcados: number | null;

  @ManyToOne(() => Jogador, (jogador) => jogador.jogadorJogos)
  @JoinColumn([{ name: "id_jogador", referencedColumnName: "id" }])
  idJogador2: Jogador;

  @ManyToOne(() => Jogo, (jogo) => jogo.jogadorJogos)
  @JoinColumn([{ name: "id_jogo", referencedColumnName: "id" }])
  idJogo2: Jogo;
}
