import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateDescriptionDto } from 'src/descriptions/dto/create-description.dto';
import { Description, DescriptionDocument } from 'src/descriptions/schema/description.schema';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { Comment, CommentDocument } from 'src/comments/schema/comment.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Description.name) private descriptionModel: Model<DescriptionDocument>,
    ){}
    

  async getAll(): Promise<Movie[]>{
    return this.movieModel.find().exec();
  }

  async getById(id: string): Promise<Movie> {
    return await this.movieModel.findById(id).populate('comment')
  }
  
  async create(movieDto: CreateMovieDto, descriptionDto: CreateDescriptionDto): Promise<Movie> {
    const newMovie = new this.movieModel(movieDto)
    const newDescription = new this.descriptionModel(descriptionDto)
    newDescription.save()
    newMovie.description = newDescription._id 
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

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const movie = await this.movieModel.findById(dto.movieId)
    const newComment = await this.commentModel.create({...dto})
    var _date = new Date()
    newComment.date = _date.toDateString() + ' ' + _date.getHours().toString() + ':' + _date.getMinutes().toString()
    movie.comment.push(newComment._id)
    await movie.save()
    return newComment
  }
}

