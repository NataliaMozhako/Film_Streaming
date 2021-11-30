import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';
import { User } from 'src/users/schema/user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment{
  
  @Prop()
  content: string

  @Prop()
  date: string

  @Prop()
  username: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movie: Movie;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);