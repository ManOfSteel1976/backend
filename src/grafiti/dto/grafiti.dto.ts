import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class GrafitiDto {
    @IsNumber()
    @IsNotEmpty()
    usuario?: UsuarioEntity;
    @IsString()
    @IsNotEmpty()
    artista?: string;
    @IsNumber()
    @IsNotEmpty()
    lat?: number;
    @IsNumber()
    @IsNotEmpty()
    long?: number;
    @IsString()
    @IsNotEmpty()
    url : string;
}