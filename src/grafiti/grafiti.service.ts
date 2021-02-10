import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constants } from 'http2';
import { GrafitiDto } from './dto/grafiti.dto';
import { GrafitiEntity } from './grafiti.entity';
import { GrafitiRepository } from './grafiti.repository';
import { UsuarioRepository } from "src/usuario/usuario.repository"
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class GrafitiService {

    constructor(
        @InjectRepository(GrafitiEntity)
        private grafitiRepository: GrafitiRepository,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository
    ) { }

    async getAll(): Promise<GrafitiEntity[]> {
        const list = await this.grafitiRepository.find();
        if(!list.length){
            throw new NotFoundException({message: 'la lista está vacía'});
        }
        return list;
    }

    async findById(id: number): Promise<GrafitiEntity>{
        const grafiti = await this.grafitiRepository.findOne(id);
        if(!grafiti){
            throw new NotFoundException({message: 'Ese grafiti no existe'});
        }
        return grafiti;
    }

    async findByArtista(artista: string): Promise<GrafitiEntity>{
        const grafiti = await this.grafitiRepository.findOne({artista: artista});
        if(!grafiti){
            throw new NotFoundException({message: 'no hay grafitis de ese artista'});
        }
        return grafiti;
    }

    async findByArtistaParcial(parte: string): Promise<GrafitiEntity[]> {
        const artista = await this.grafitiRepository.createQueryBuilder("artista")
        .where("artista like :nombre", { nombre:`%${parte}%` })
        .getMany();
        return artista;
    }

    async findByEmailUsuario(email: string): Promise<GrafitiEntity[]> {
        const usuario = await this.usuarioRepository.findOne({ email: email });
        if(!usuario){
            throw new NotFoundException({message: 'no existe ese usuario'});
        }
        const grafiti = await this.grafitiRepository.find({ usuario: usuario });
        if(!grafiti){
            throw new NotFoundException({message: 'no hay grafitis de ese usuario'});
        }
        return grafiti;
    }

    async findByURL(url: string): Promise<GrafitiEntity> {
        const grafiti = await this.grafitiRepository.findOne({ url: url });
        if(!grafiti){
            throw new NotFoundException({message: 'esa url no existe'});
        }
        return grafiti;
    }

    async create(dto: GrafitiDto): Promise<any> {
        //const usuario = await this.usuarioRepository.findOne({ id : dto.usuario.id});
        //if(!usuario) throw new BadRequestException({message: "ese usuario no existe"});
        const existeURL = await this.findByURL(dto.url);
        if (existeURL) throw new BadRequestException({message: 'URL ya existente'});
        const grafiti = this.grafitiRepository.create(dto);
        await this.grafitiRepository.save(grafiti);
        return {message: `Grafiti ${grafiti.id} creado`};
    }

    async update(id: number, dto: GrafitiDto): Promise<any> {
        const grafiti = await this.findById(id);
        if(!grafiti) throw new BadRequestException({message: "ese grafiti no existe"});
        const existeURL = await this.findByURL(dto.url);
        if (existeURL && existeURL.id !== id) throw new BadRequestException({message: 'URL ya existente'});
        dto.usuario? grafiti.usuario = dto.usuario : grafiti.usuario = grafiti.usuario;
        dto.artista? grafiti.artista = dto.artista : grafiti.artista = grafiti.artista;
        dto.lat? grafiti.lat = dto.lat : grafiti.lat = grafiti.lat;
        dto.long? grafiti.long = dto.long : grafiti.long = grafiti.long;
        dto.url? grafiti.url = dto.url : grafiti.url = grafiti.url;
        await this.grafitiRepository.save(grafiti);
        return {message: `usuario ${grafiti.id} actualizado`};
    }

    async delete(id: number): Promise<any>{
        const grafiti = await this.findById(id);
        await this.grafitiRepository.delete(grafiti);
        return {message: `grafiti ${grafiti.id} eliminado`};
    }

}
