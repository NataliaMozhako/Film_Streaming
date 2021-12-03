import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './schema/comment.schema';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [MongooseModule.forFeature([
    { name: Comment.name, schema: CommentSchema }
  ]), UsersModule, MoviesModule],
  exports: [CommentsService]
})
export class CommentsModule { }
