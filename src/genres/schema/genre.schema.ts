import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre{

  @Prop()
  _id: string 
  
  @Prop()
  title: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movie: Movie[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);