import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrafitiDto } from './dto/grafiti.dto';
import { GrafitiService } from './grafiti.service';

@Controller('grafiti')
export class GrafitiController {

    constructor(private readonly grafitiService: GrafitiService) {}

    @Get()
    async getAll(){
        return await this.grafitiService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.grafitiService.findById(id);
    }

    @Get('artista/:artista')
    async getByArtista(@Param('artista') artista: string) {
        return await this.grafitiService.findByArtistaParcial(artista);
    }

  
    @Get('/emailusuario/:email')
    async getByEmailUsuario(@Param('email') email: string) {
        return await this.grafitiService.findByEmailUsuario(email);
    }


    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: GrafitiDto) {
        return await this.grafitiService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: GrafitiDto) {
        return await this.grafitiService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.grafitiService.delete(id);
    }
}
