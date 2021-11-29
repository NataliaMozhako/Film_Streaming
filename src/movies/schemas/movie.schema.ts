import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from 'src/comments/schema/comment.schema';
import * as mongoose from 'mongoose';
import { Description } from 'src/descriptions/schema/description.schema';
import { Year } from 'src/years/schema/year.schema';
import { Genre } from 'src/genres/schema/genre.schema';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie{

  @Prop()
  title: string

  @Prop()
  movieLink: string

  @Prop()
  poster: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comment: Comment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Description' })
  description: Description;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Year' })
  year: Year;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre'})
  genre: Genre;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);