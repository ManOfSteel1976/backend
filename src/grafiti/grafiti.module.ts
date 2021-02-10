import { Module } from '@nestjs/common';
import { GrafitiService } from './grafiti.service';
import { GrafitiController } from './grafiti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrafitiEntity } from './grafiti.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioController } from 'src/usuario/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GrafitiEntity, UsuarioEntity])],
  providers: [GrafitiService, UsuarioService],
  controllers: [GrafitiController, UsuarioController]
})
export class GrafitiModule {}
