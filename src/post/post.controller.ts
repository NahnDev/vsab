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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from 'src/auth/guards/policies.guard';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';

// @PublicApi()
@ApiTags('posts')
@ApiBearerAuth()
@CheckPolicies()
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @RequestUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  @ApiQuery({ type: 'boolean', name: 'wait', required: false })
  @ApiQuery({ type: 'string', name: 'association', required: false })
  findAll(
    @Query('wait') wait: string,
    @Query('association') association: string,
  ) {
    return this.postService.findAll({ wait: wait === 'true', association });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string, @RequestUser() user: User) {
    return this.postService.like(id, user);
  }

  @Delete(':id/like')
  unlike(@Param('id') id: string, @RequestUser() user: User) {
    return this.postService.unlike(id, user);
  }
}
