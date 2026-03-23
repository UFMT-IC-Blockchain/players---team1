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
import { Role } from './modules/roles/entities/role.entity';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import { TimesModule } from './modules/times/times.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Role, Usuario],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    RolesModule,
    AuthModule,
    UsuarioModule,
    JogadoresModule,
    JogoModule,
    EstatisticasModule,
    ConfrontosModule,
    RecompensasModule,
    TimesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
