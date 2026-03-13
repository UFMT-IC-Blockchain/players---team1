import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogador } from './entities/jogador.entity';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jogador])],
  providers: [JogadoresService],
  controllers: [JogadoresController],
  exports: [JogadoresService],
})
export class JogadoresModule {}
