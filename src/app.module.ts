import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { GrafitiModule } from './grafiti/grafiti.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '92.38.171.129',
      port: 3306,
      username: 'root',
      password: 'Zx171260225!',
      database: 'david',
      entities: [__dirname+'/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false
    }),UsuarioModule,GrafitiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
