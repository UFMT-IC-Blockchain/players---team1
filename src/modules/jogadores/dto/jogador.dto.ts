import { ApiProperty } from '@nestjs/swagger';

export class JogadorDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Nome do jogador' })
  nome: string;

  @ApiProperty({
    example: 'GBRPYHIL2CQRJ4JZ7Q5SPSG6V2V6S7NYL6T6W3F4B2J6Q2KZ5O2M3H4',
    nullable: true,
  })
  carteiraStellar: string | null;
}
