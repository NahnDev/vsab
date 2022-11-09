import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@ApiBearerAuth()
@CheckPolicies()
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() dto: CreateCommentDto, @RequestUser() user: User) {
    return this.commentService.create(dto, user);
  }

  @Get()
  @ApiQuery({ type: 'string', name: 'post' })
  findAll(@Query('post') post: string) {
    return this.commentService.findAll({ post });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string, @RequestUser() user: User) {
    return this.commentService.like(id, user);
  }

  @Delete(':id/like')
  unlike(@Param('id') id: string, @RequestUser() user: User) {
    return this.commentService.unlike(id, user);
  }
}
