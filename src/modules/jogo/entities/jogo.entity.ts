import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JogadorJogo } from '../../estatisticas/entities/jogador-jogo.entity';
import { TimeJogo } from '../../confrontos/entities/time-jogo.entity';
import { TransacaoRecompensa } from '../../recompensas/entities/transacao-recompensa.entity';

@Index('jogo_pkey', ['id'], { unique: true })
@Entity('jogo', { schema: 'public' })
export class Jogo {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'duracao' })
  duracao: number;

  @OneToMany(() => JogadorJogo, (jogadorJogo) => jogadorJogo.idJogo2)
  jogadorJogos: JogadorJogo[];

  @OneToMany(() => TimeJogo, (timeJogo) => timeJogo.idJogo2)
  timeJogos: TimeJogo[];

  @OneToMany(
    () => TransacaoRecompensa,
    (transacaoRecompensa) => transacaoRecompensa.idJogo,
  )
  transacaoRecompensas: TransacaoRecompensa[];
}
