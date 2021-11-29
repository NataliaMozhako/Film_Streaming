import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';

export type DescriptionDocument = Description & Document;

@Schema()
export class Description{

  @Prop()
  backdrop: string

  @Prop()
  overview: string

  @Prop()
  actors: string

  @Prop()
  ageLimitation: number

  @Prop()
  rating: number

  @Prop()
  voteCount: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movie: Movie;
}

export const DescriptionSchema = SchemaFactory.createForClass(Description);