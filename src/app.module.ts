import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { JogoModule } from './modules/jogo/jogo.module';
import { Jogo } from './modules/jogo/entities/jogo.entity';
import { JogadorJogo } from 'entities/JogadorJogo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Jogo, JogadorJogo],
      synchronize: true,
      autoLoadEntities: true
    }),
    RolesModule,
    UsuarioModule,
    JogoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}