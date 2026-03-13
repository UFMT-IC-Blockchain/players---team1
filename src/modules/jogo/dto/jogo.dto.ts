import { ApiProperty } from '@nestjs/swagger';

export class JogoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 90 })
  duracao: number;
}
