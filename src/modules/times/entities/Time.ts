import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Jogador } from "../../../../entities/Jogador";
import { TimeJogo } from "../../../../entities/TimeJogo";

@Index("time_pkey", ["id"], { unique: true })
@Entity("time", { schema: "public" })
export class Time {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "sigla", length: 3 })
  sigla: string;

  @OneToMany(() => Jogador, (jogador) => jogador.idTime)
  jogadors: Jogador[];

  @OneToMany(() => TimeJogo, (timeJogo) => timeJogo.idTime2)
  timeJogos: TimeJogo[];
}
