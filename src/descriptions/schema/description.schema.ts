import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const DescriptionSchema = SchemaFactory.createForClass(Description);