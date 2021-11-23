import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schema/comment.schema';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService){}

  @Get()
  getAll(): Promise<Comment[]> {
    return this.commentsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.getById(id)
  }

  @Post()
  create(@Body() createCreateDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCreateDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.remove(id)
  }
}
