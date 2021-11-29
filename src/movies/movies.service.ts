import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateDescriptionDto } from 'src/descriptions/dto/create-description.dto';
import { Description } from 'src/descriptions/schema/description.schema';

@Injectable()
export class MoviesService {
    constructor(
      @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
      @InjectModel(Description.name) private descriptionModel: Model<MovieDocument>){}


    async getAll(): Promise<Movie[]>{
      return this.movieModel.find().exec();
    }

    async getById(id: string): Promise<Movie> {
      return await this.movieModel.findById(id)
    }
    
    async create(movieDto: CreateMovieDto, descriptionDto: CreateDescriptionDto): Promise<Movie> {
      const newMovie = new this.movieModel(movieDto)
      const newDescription = new this.descriptionModel(descriptionDto)
      newDescription.save()
      newDescription._id = newMovie._id 
      return newMovie.save()
    }
    
    async remove(id: string): Promise<Movie> {
        return this.movieModel.findByIdAndRemove(id)
    }
    
    async update(id: string, movieDto: UpdateMovieDto): Promise<Movie> {
        return this.movieModel.findByIdAndUpdate(id, movieDto, {new: true})
    }

    async getByName(namef: string): Promise<Movie[]>{
      return this.movieModel.find({name: namef})
    }  
}

