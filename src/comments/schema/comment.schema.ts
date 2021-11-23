import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment{
  
  @Prop()
  content: string

  @Prop()
  date: string

}

export const CommentSchema = SchemaFactory.createForClass(Comment);