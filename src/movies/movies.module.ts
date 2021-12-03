import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionsModule } from 'src/descriptions/descriptions.module';
import { Description, DescriptionSchema } from 'src/descriptions/schema/description.schema';
import { GenresModule } from 'src/genres/genres.module';
import { Genre, GenreSchema } from 'src/genres/schema/genre.schema';
import { Year, YearSchema } from 'src/years/schema/year.schema';
import { YearsModule } from 'src/years/years.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [MongooseModule.forFeature([
    { name: Movie.name, schema: MovieSchema },
    { name: Description.name, schema: DescriptionSchema },
    { name: Genre.name, schema: GenreSchema },
    { name: Year.name, schema: YearSchema }
  ]),
DescriptionsModule, GenresModule, YearsModule],
  exports: [MoviesService]
})
export class MoviesModule { }
