import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie{

  @Prop()
  title: string

  @Prop()
  movieLink: string

  @Prop()
  poster: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);