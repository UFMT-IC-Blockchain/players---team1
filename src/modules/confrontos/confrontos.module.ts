import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfrontosController } from './confrontos.controller';
import { ConfrontosService } from './confrontos.service';
import { TimeJogo } from './entities/time-jogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeJogo])],
  providers: [ConfrontosService],
  controllers: [ConfrontosController],
  exports: [ConfrontosService],
})
export class ConfrontosModule {}
