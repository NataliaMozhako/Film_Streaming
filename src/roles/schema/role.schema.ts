import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  
  _id: mongoose.ObjectId;

  @Prop()
  title: string


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);