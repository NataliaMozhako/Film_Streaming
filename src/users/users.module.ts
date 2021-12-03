import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { RolesModule } from 'src/roles/roles.module';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema}
  ]),
ProfilesModule, RolesModule],
exports: [UsersService]
})
export class UsersModule {}
