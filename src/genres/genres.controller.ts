import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-gener.dto';
import { UpdateGenreDto } from './dto/update-gener.dto';
import { GenresService } from './genres.service';
import { Genre } from './schema/genre.schema';

@Controller('genres')
export class GenresController {

  constructor(private readonly genresService: GenresService) { }

  @Get()
  getAll(): Promise<Genre[]> {
    return this.genresService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Genre> {
    return this.genresService.getById(id)
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Genre> {
    return this.genresService.remove(id)
  }

  @Put(':id')
  update(@Body() updateGenreDto: UpdateGenreDto, @Param('id') id: string): Promise<Genre> {
    return this.genresService.update(id, updateGenreDto)
  }
}
