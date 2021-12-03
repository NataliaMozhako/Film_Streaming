import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateDescriptionDto } from 'src/descriptions/dto/create-description.dto';
import { Description, DescriptionDocument } from 'src/descriptions/schema/description.schema';
import { Comment, CommentDocument } from 'src/comments/schema/comment.schema';
import { Genre, GenreDocument } from 'src/genres/schema/genre.schema';
import { Year, YearDocument } from 'src/years/schema/year.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Description.name) private descriptionModel: Model<DescriptionDocument>,
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    @InjectModel(Year.name) private yearModel: Model<YearDocument>
  ) { }


  async getAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

<<<<<<< Updated upstream
  async getById(id: string)/*: Promise<Movie>*/ {
=======
  async getById(id: string): Promise<Movie> {
>>>>>>> Stashed changes
    return await this.movieModel.findById(id).populate('comment').populate('genre').populate('year').populate('description')
  }

  async create(movieDto: CreateMovieDto, descriptionDto: CreateDescriptionDto): Promise<Movie> {
    console.log(movieDto);
    const newMovie = new this.movieModel(movieDto)
    const newDescription = new this.descriptionModel(descriptionDto)
    const year = await this.yearModel.findById(movieDto.yearId)
    const genre = await this.genreModel.findById(movieDto.genreId)
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
    const description = await this.descriptionModel.findById(movie.description)
    const year = await this.yearModel.findById(movie.year)
    const genre = await this.genreModel.findById(movie.genre)
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
    return this.descriptionModel.findByIdAndRemove(id)
  }

  async update(id: string, movieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, movieDto, { new: true })
  }

}

