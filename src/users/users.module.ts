import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesController } from 'src/profiles/profiles.controller';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile, ProfileSchema } from 'src/profiles/schema/profile.schema';
import { RolesController } from 'src/roles/roles.controller';
import { RolesService } from 'src/roles/roles.service';
import { Role, RoleSchema } from 'src/roles/schema/role.schema';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ProfilesService, RolesService],
  controllers: [UsersController, ProfilesController, RolesController],
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: Profile.name, schema: ProfileSchema},
    {name: Role.name, schema: RoleSchema}
  ])]
})
export class UsersModule {}
