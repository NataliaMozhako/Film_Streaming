import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateDescriptionDto } from 'src/descriptions/dto/create-description.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) { }

  @Get()
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getById(id)
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @Body() createDescriptionDto: CreateDescriptionDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto, createDescriptionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.remove(id)
  }

  @Put(':id')
  update(@Body() updateMovieDto: UpdateMovieDto, @Param('id') id: string): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto)
  }

  @Put('/genre/:id')
  updateMovieGenre(@Param('id') id: string, @Body() movieGenreDto: UpdateMovieGenreDto) {
    return this.moviesService.updateMovieGenre(id, movieGenreDto)
  }
}

