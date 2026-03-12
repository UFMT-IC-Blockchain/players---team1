import { IsNotEmpty, IsString } from "class-validator";

export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
}