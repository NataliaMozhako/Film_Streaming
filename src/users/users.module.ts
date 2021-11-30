import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesController } from 'src/profiles/profiles.controller';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile, ProfileSchema } from 'src/profiles/schema/profile.schema';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ProfilesService],
  controllers: [UsersController, ProfilesController],
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: Profile.name, schema: ProfileSchema}
  ])]
})
export class UsersModule {}
