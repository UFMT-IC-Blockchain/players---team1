import { ApiProperty } from '@nestjs/swagger';

export class CreateJogoDto {
  @ApiProperty({
    example: 90,
    description: 'Duração do jogo (em minutos)',
    minimum: 1,
  })
  duracao: number;
}
