import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController], 
  imports: [MongooseModule.forFeature([
      {name: Movie.name, schema: MovieSchema}
    ])]
})
export class MoviesModule {}
