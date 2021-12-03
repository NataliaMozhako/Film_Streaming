import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Date } from "mongoose"
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly moviesServise: MoviesService,
    private readonly usersServise: UsersService) { }


  async getAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async getById(id: string): Promise<Comment> {
    return this.commentModel.findById(id)
  }

  async create(commentDto: CreateCommentDto): Promise<Comment> {
    const movie = await this.moviesServise.getById(commentDto.movieId.toString())
    const user = await this.usersServise.getById(commentDto.userId.toString())
    const newComment = new this.commentModel(commentDto)
    var _date = new Date()
    newComment.date = _date.toDateString() + ' ' + _date.getHours().toString() + ':' +
      _date.getMinutes().toString()
    movie.comment.push(newComment._id)
    movie.save()
    newComment.username = user.username
    return newComment.save()
  }

  async remove(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndRemove(id)
  }
}
