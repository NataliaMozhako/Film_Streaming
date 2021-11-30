import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CreateDescriptionDto } from 'src/descriptions/dto/create-description.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
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

  @Get()
  getByName(@Param() name: string): Promise<Movie[]> {
    return this.moviesService.getByName(name)
  }

  @Post('/comment')
    addComment(@Body() createCommentDto: CreateCommentDto) {
        return this.moviesService.addComment(createCommentDto);
    }
}

