import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';

export type YearDocument = Year & Document;

@Schema()
export class Year{
  
  @Prop()
  year: number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movie: Movie[];
}

export const YearSchema = SchemaFactory.createForClass(Year);