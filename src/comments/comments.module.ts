import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './schema/comment.schema';

@Module({
  providers: [CommentsService],
  controllers:[CommentsController],
  imports: [MongooseModule.forFeature([
    {name: Comment.name, schema: CommentSchema}
  ])]
})
export class CommentsModule {}
