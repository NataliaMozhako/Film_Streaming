import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateDescriptionDto } from 'src/descriptions/dto/create-description.dto';
import { Description} from 'src/descriptions/schema/description.schema';
import { DescriptionsService } from 'src/descriptions/descriptions.service';
import { GenresService } from 'src/genres/genres.service';
import { YearsService } from 'src/years/years.service';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private readonly descriptionsService: DescriptionsService,
    private readonly genresService: GenresService,
    private readonly yearsService: YearsService
  ) { }


  async getAll(): Promise<Movie[]> {
    return this.movieModel.find().populate('description').exec()
  }

  async getById(id: string)/*: Promise<Movie>*/ {
    return await this.movieModel.findById(id).populate('comment').populate('genre').populate('year').populate('description')
  }

  async create(movieDto: CreateMovieDto, descriptionDto: CreateDescriptionDto): Promise<Movie> {
    console.log(movieDto);
    const newMovie = new this.movieModel(movieDto)
    const newDescription = await this.descriptionsService.create(descriptionDto)
    const year = await this.yearsService.getById(movieDto.yearId.toString())
    const genre = await this.genresService.getById(movieDto.genreId.toString())
    newMovie.year = year._id
    newMovie.genre = genre._id
    year.movie.push(newMovie._id)
    genre.movie.push(newMovie._id)
    year.save()
    genre.save()
    newDescription.save()
    newMovie.description = newDescription._id
    return newMovie.save()
  }

  async remove(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id)
    const description = await this.descriptionsService.getById(movie.description.toString())
    const year = await this.yearsService.getById(movie.year.toString())
    const genre = await this.genresService.getById(movie.genre.toString())
    this.removeDescription(description._id)
    const indexYear = year.movie.indexOf(movie._id, 0);
    if (indexYear > -1) {
      year.movie.splice(indexYear, 1);
    }
    const indexGenre = genre.movie.indexOf(movie._id, 0);
    if (indexGenre > -1) {
      genre.movie.splice(indexGenre, 1);
    }
    year.save()
    genre.save()
    return this.movieModel.findByIdAndRemove(id)
  }

  async removeDescription(id: string): Promise<Description> {
    return this.descriptionsService.remove(id)
  }

  async update(id: string, movieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, movieDto, { new: true })
  }

  async updateMovieGenre(id: string, movieGenreDto: UpdateMovieGenreDto){
    const movie = await this.movieModel.findById(id)
    const genre1 = await this.genresService.getById(movie.genre.toString())
    const genre2 = await this.genresService.getById(movieGenreDto.newGenreId)
    const indexGenre = genre1.movie.indexOf(movie._id, 0);
    if (indexGenre > -1) {
      genre1.movie.splice(indexGenre, 1);
    }
    genre1.save()
    movie.genre = genre2._id
    genre2.movie.push(movie._id)
    genre2.save()
    return movie.save()
  }

}

