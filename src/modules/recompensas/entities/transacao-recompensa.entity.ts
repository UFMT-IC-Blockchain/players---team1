import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Jogador } from '../../jogadores/entities/jogador.entity';
import { Jogo } from '../../jogo/entities/jogo.entity';

@Index('transacao_recompensa_hash_transacao_key', ['hashTransacao'], {
  unique: true,
})
@Index('transacao_recompensa_pkey', ['id'], { unique: true })
@Entity('transacao_recompensa', { schema: 'public' })
export class TransacaoRecompensa {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'valor_pago', precision: 19, scale: 7 })
  valorPago: string;

  @Column('character varying', {
    name: 'hash_transacao',
    nullable: true,
    unique: true,
    length: 64,
  })
  hashTransacao: string | null;

  @Column('character varying', {
    name: 'status',
    nullable: true,
    length: 20,
    default: () => "'PENDENTE'",
  })
  status: string | null;

  @Column('timestamp without time zone', {
    name: 'data_registro',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataRegistro: Date | null;

  @ManyToOne(() => Jogador, (jogador) => jogador.transacaoRecompensas)
  @JoinColumn([{ name: 'id_jogador', referencedColumnName: 'id' }])
  idJogador: Jogador;

  @ManyToOne(() => Jogo, (jogo) => jogo.transacaoRecompensas)
  @JoinColumn([{ name: 'id_jogo', referencedColumnName: 'id' }])
  idJogo: Jogo;
}
