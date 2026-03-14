import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { JogoModule } from './modules/jogo/jogo.module';
import { EstatisticasModule } from './modules/estatisticas/estatisticas.module';
import { ConfrontosModule } from './modules/confrontos/confrontos.module';
import { RecompensasModule } from './modules/recompensas/recompensas.module';
import { Jogo } from './modules/jogo/entities/jogo.entity';
import { JogadorJogo } from './modules/estatisticas/entities/jogador-jogo.entity';
import { Jogador } from './modules/jogadores/entities/jogador.entity';
import { Time } from './modules/times/entities/Time';
import { TimeJogo } from './modules/confrontos/entities/time-jogo.entity';
import { TransacaoRecompensa } from './modules/recompensas/entities/transacao-recompensa.entity';
import { Role } from './modules/roles/entities/role.entity';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import * as dbConfig from '../configdb.json';
import { TimesModule } from './modules/times/times.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dbConfig.url,
      entities: [
        Usuario,
        Role,
        Jogo,
        Jogador,
        Time,
        TimeJogo,
        JogadorJogo,
        TransacaoRecompensa,
      ],
      synchronize: false,
      autoLoadEntities: true,
    }),
    RolesModule,
    AuthModule,
    UsuarioModule,
    JogadoresModule,
    JogoModule,
    EstatisticasModule,
    ConfrontosModule,
    RecompensasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
