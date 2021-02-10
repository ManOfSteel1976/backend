import { CacheModuleAsyncOptions } from "@nestjs/common";
import { UsuarioModule } from "src/usuario/usuario.module";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {UsuarioEntity} from "src/usuario/usuario.entity";

//entidad muchos

@Entity({name : 'grafiti'})
export class GrafitiEntity{
    
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column({type: 'varchar', length: 50, nullable: false, unique: false})
    artista : string;

    @Column({type: 'float', nullable: false, unique: false})
    lat : number;
    
    @Column({type: 'float', nullable: false, unique: false})
    long : number;
    
    @Column({type: 'varchar', length: 200, nullable: false, unique: false})
    url : string;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.grafitis, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'usuario' })
    usuario : UsuarioEntity;

}
