import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './entities/jogo.entity';
import { JogoService } from './jogo.service';
import { JogoController } from './jogo.controller';
import { JogadorJogo } from '../estatisticas/entities/jogador-jogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo, JogadorJogo])],
  providers: [JogoService],
  controllers: [JogoController],
})
export class JogoModule {}
