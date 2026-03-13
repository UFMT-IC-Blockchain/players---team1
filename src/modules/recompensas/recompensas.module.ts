import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoRecompensa } from './entities/transacao-recompensa.entity';
import { RecompensasController } from './recompensas.controller';
import { RecompensasService } from './recompensas.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransacaoRecompensa])],
  providers: [RecompensasService],
  controllers: [RecompensasController],
  exports: [RecompensasService],
})
export class RecompensasModule {}
