import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constants } from 'http2';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private  usuarioRepository: UsuarioRepository
    ) { }

    async getAll(): Promise<UsuarioEntity[]> {
        const list = await this.usuarioRepository.find();
        if(!list.length){
            throw new NotFoundException({message: 'la lista está vacía'});
        }
        return list;
    }

    /*async getAllByUser(nombre: string): Promise<UsuarioEntity[]> {
        const list = await this.usuarioRepository.find({nombre: nombre});
        if(!list.length){
            throw new NotFoundException({message: 'la lista está vacía'});
        }
        return list;
    }*/

    async findById(id: number): Promise<UsuarioEntity>{
        const usuario = await this.usuarioRepository.findOne(id);
        if(!usuario){
            throw new NotFoundException({message: 'usuario no existe'});
        }
        return usuario;
    }

    async findByNombre(nombre: string): Promise<UsuarioEntity>{
        const usuario = await this.usuarioRepository.findOne({nombre: nombre});
        return usuario;
    }

    async findByNombreParcial(parte: string): Promise<UsuarioEntity[]> {
        const usuario = await this.usuarioRepository.createQueryBuilder("usuario")
        .where("usuario.nombre like :nombre", { nombre:`%${parte}%` })
        .getMany();
        return usuario;
    }

    async findByEmail(email: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ email: email });
        return usuario;
    }

    async create(dto: UsuarioDto): Promise<any> {
        const existeNombre = await this.findByNombre(dto.nombre);
        if (existeNombre) throw new BadRequestException({message: 'Nombre ya existente'});
        const existeEmail = await this.findByEmail(dto.email);
        if (existeEmail) throw new BadRequestException({message: 'Email ya existente'});
        const usuario = this.usuarioRepository.create(dto);
        await this.usuarioRepository.save(usuario);
        return {message: `usuario ${usuario.nombre} creado`};
    }

    async update(id: number, dto: UsuarioDto): Promise<any> {
        const usuario = await this.findById(id);
        if (!usuario) throw new BadRequestException({message: 'No existe ese usuario'});
        const existeNombre = await this.findByNombre(dto.nombre);
        if (existeNombre && existeNombre.id !== id) throw new BadRequestException({message: 'Nombre ya existente'});
        const existeEmail = await this.findByEmail(dto.email);
        if (existeEmail && existeEmail.id !== id) throw new BadRequestException({message: 'Email ya existente'});
        dto.nombre ? usuario.nombre = dto.nombre : usuario.nombre = usuario.nombre;
        dto.email ? usuario.email = dto.email : usuario.email = usuario.email;
        await this.usuarioRepository.save(usuario);
        return {message: `usuario ${usuario.nombre} actualizado`};
    }

    async delete(id: number): Promise<any>{
        const usuario = await this.findById(id);
        await this.usuarioRepository.delete(usuario);
        return {message: `usuario ${usuario.nombre} eliminado`};
    }

}
