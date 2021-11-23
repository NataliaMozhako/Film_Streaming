import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Profile } from 'src/profiles/schema/profile.schema';

export type UserDocument = User & Document;

@Schema()
export class User{

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);