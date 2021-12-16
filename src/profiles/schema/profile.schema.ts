import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {

  _id: mongoose.ObjectId;

  @Prop()
  phoneNumber: number

  @Prop()
  stripeId : string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);