import { CacheModuleAsyncOptions } from "@nestjs/common";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {GrafitiEntity} from "src/grafiti/grafiti.entity"

//entidad uno

@Entity({name : 'usuario'})
export class UsuarioEntity{
    
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    nombre : string;
    
    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    email : string;

    @OneToMany(() => GrafitiEntity, (grafiti) => grafiti.usuario, {nullable: true, onDelete: 'CASCADE'})
    grafitis : GrafitiEntity[];

}