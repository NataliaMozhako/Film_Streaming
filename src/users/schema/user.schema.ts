import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Profile } from 'src/profiles/schema/profile.schema';
import { Role } from 'src/roles/schema/role.schema';

export type UserDocument = User & Document;

@Schema()
export class User{

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comment: Comment[];
}

export const UserSchema = SchemaFactory.createForClass(User);