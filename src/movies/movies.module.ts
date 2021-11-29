import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionsController } from 'src/descriptions/descriptions.controller';
import { DescriptionsService } from 'src/descriptions/descriptions.service';
import { Description, DescriptionSchema } from 'src/descriptions/schema/description.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  providers: [MoviesService, DescriptionsService],
  controllers: [MoviesController, DescriptionsController],
  imports: [MongooseModule.forFeature([
    { name: Movie.name, schema: MovieSchema },
    {name: Description.name, schema: DescriptionSchema}
  ])]
})
export class MoviesModule { }
