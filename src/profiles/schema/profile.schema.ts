import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile{
  @Prop()
  username: string

  @Prop()
  phoneNumber: number

  @Prop()
  age: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);