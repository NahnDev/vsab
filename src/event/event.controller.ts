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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { CreateScheduleDto } from '../schedule/dto/create-schedule.dto';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@PublicApi()
@ApiTags('events')
// @CheckPolicies()
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiQuery({ type: 'string', name: 'association' })
  findAll(@Query('association') association: string) {
    return this.eventService.findAll({ association });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }

  @Post(':id/posts')
  addPost(@Param('id') id: string, @Body() dto: CreatePostDto) {
    return this.eventService.addPost(id, dto);
  }

  @Delete(':id/posts/:pId')
  removePost(@Param('id') id: string, @Param('pId') pId: string) {
    return this.eventService.removePost(id, pId);
  }

  @Patch(`:id/posts/publish`)
  publish(@Param('id') id: string) {
    return this.eventService.publish(id);
  }

  @Patch(`:id/posts/unpublish`)
  endEvent(@Param('id') id: string) {
    return this.eventService.unpublish(id);
  }
}
