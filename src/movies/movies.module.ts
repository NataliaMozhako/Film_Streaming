import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from 'src/comments/comments.controller';
import { CommentsService } from 'src/comments/comments.service';
import { Comment, CommentSchema } from 'src/comments/schema/comment.schema';
import { DescriptionsController } from 'src/descriptions/descriptions.controller';
import { DescriptionsService } from 'src/descriptions/descriptions.service';
import { Description, DescriptionSchema } from 'src/descriptions/schema/description.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  providers: [MoviesService, DescriptionsService, CommentsService],
controllers: [MoviesController, DescriptionsController, CommentsController],
  imports: [MongooseModule.forFeature([
    {name: Movie.name, schema: MovieSchema },
    {name: Description.name, schema: DescriptionSchema},
    {name: Comment.name, schema: CommentSchema}
  ])]
})
export class MoviesModule {}
