import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role{

  @Prop()
  _id: string 
  
  @Prop()
  title: string

}

export const RoleSchema = SchemaFactory.createForClass(Role);