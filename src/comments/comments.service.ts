import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Date } from "mongoose"

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>){}


    async getAll(): Promise<Comment[]>{
      return this.commentModel.find().exec();
    }

    async getById(id: string): Promise<Comment> {
      return this.commentModel.findById(id)
    }
      
    async create(commentDto: CreateCommentDto): Promise<Comment> {
      const newComment = new this.commentModel(commentDto) 
      var _date = new Date()
      newComment.date = _date.toDateString() + ' ' + _date.getHours().toString() + ':' +
      _date.getMinutes().toString()
      return newComment.save()
    }
    
    async remove(id: string): Promise<Comment> {
        return this.commentModel.findByIdAndRemove(id)
    }
}
