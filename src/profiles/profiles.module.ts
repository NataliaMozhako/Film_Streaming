import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { Profile, ProfileSchema } from './schema/profile.schema';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [MongooseModule.forFeature([
    {name: Profile.name, schema: ProfileSchema}
  ])]
})
export class ProfilesModule {}
