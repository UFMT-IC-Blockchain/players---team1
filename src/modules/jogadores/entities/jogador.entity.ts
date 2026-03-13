import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Time } from '../../../../entities/Time';
import { JogadorJogo } from '../../../../entities/JogadorJogo';
import { TransacaoRecompensa } from '../../../../entities/TransacaoRecompensa';

@Index('jogador_carteira_stellar_key', ['carteiraStellar'], { unique: true })
@Index('jogador_pkey', ['id'], { unique: true })
@Entity('jogador', { schema: 'public' })
export class Jogador {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'nome' })
  nome: string;

  @Column('character varying', {
    name: 'carteira_stellar',
    nullable: true,
    unique: true,
    length: 56,
    default: () => 'NULL::character varying',
  })
  carteiraStellar: string | null;

  @ManyToOne(() => Time, (time) => time.jogadors)
  @JoinColumn([{ name: 'id_time', referencedColumnName: 'id' }])
  idTime: Time;

  @OneToMany(() => JogadorJogo, (jogadorJogo) => jogadorJogo.idJogador2)
  jogadorJogos: JogadorJogo[];

  @OneToMany(
    () => TransacaoRecompensa,
    (transacaoRecompensa) => transacaoRecompensa.idJogador,
  )
  transacaoRecompensas: TransacaoRecompensa[];
}
