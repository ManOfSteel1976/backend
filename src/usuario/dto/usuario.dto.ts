import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre?: string;
    @IsString()
    @IsNotEmpty()
    email?: string;
}