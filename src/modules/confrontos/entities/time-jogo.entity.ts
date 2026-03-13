import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Jogo } from '../../jogo/entities/jogo.entity';
import { Time } from '../../../../entities/Time';

@Index('time_jogo_pkey', ['idJogo', 'idTime'], { unique: true })
@Entity('time_jogo', { schema: 'public' })
export class TimeJogo {
  @Column('integer', { primary: true, name: 'id_time' })
  idTime: number;

  @Column('integer', { primary: true, name: 'id_jogo' })
  idJogo: number;

  @Column('integer', { name: 'pontuacao' })
  pontuacao: number;

  @Column('boolean', { name: 'vencedor' })
  vencedor: boolean;

  @ManyToOne(() => Jogo, (jogo) => jogo.timeJogos)
  @JoinColumn([{ name: 'id_jogo', referencedColumnName: 'id' }])
  idJogo2: Jogo;

  @ManyToOne(() => Time, (time) => time.timeJogos)
  @JoinColumn([{ name: 'id_time', referencedColumnName: 'id' }])
  idTime2: Time;
}
