import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type YearDocument = Year & Document;

@Schema()
export class Year{

  @Prop()
  _id: number 
  
  @Prop()
  year: number

}

export const YearSchema = SchemaFactory.createForClass(Year);