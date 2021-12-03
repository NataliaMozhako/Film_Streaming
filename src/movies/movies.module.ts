import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from 'src/comments/comments.controller';
import { CommentsService } from 'src/comments/comments.service';
import { Comment, CommentSchema } from 'src/comments/schema/comment.schema';
import { DescriptionsController } from 'src/descriptions/descriptions.controller';
import { DescriptionsService } from 'src/descriptions/descriptions.service';
import { Description, DescriptionSchema } from 'src/descriptions/schema/description.schema';
import { GenresController } from 'src/genres/genres.controller';
import { GenresService } from 'src/genres/genres.service';
import { Genre, GenreSchema } from 'src/genres/schema/genre.schema';
import { Year, YearSchema } from 'src/years/schema/year.schema';
import { YearsController } from 'src/years/years.controller';
import { YearsService } from 'src/years/years.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [MongooseModule.forFeature([
    { name: Movie.name, schema: MovieSchema },
    { name: Description.name, schema: DescriptionSchema },
    { name: Comment.name, schema: CommentSchema },
    { name: Genre.name, schema: GenreSchema },
    { name: Year.name, schema: YearSchema }
  ])],
  exports: [MoviesService]
})
export class MoviesModule { }
