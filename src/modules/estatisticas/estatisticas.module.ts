import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstatisticasController } from './estatisticas.controller';
import { EstatisticasService } from './estatisticas.service';
import { JogadorJogo } from './entities/jogador-jogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JogadorJogo])],
  providers: [EstatisticasService],
  controllers: [EstatisticasController],
  exports: [EstatisticasService],
})
export class EstatisticasModule {}
