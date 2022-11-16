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
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { VolunteerService } from 'src/volunteer/volunteer.service';

@ApiTags('events')
@CheckPolicies()
@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly volunteerService: VolunteerService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @PublicApi()
  @ApiQuery({ type: 'string', name: 'association' })
  @ApiQuery({ type: 'string', name: 'event' })
  findAll(
    @Query('association') association: string,
    @Query('event') event: string,
  ) {
    const filter = {};
    if (association) filter['association'] = association;
    if (event) filter['event'] = event;
    return this.eventService.findAll(filter);
  }

  @Get(':id')
  @PublicApi()
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

  @Patch(`:id/publish`)
  publish(@Param('id') id: string) {
    return this.eventService.publish(id);
  }

  @Patch(`:id/unpublish`)
  unpublish(@Param('id') id: string) {
    return this.eventService.unpublish(id);
  }

  @Post(`:id/join`)
  join(@Param('id') id: string, @RequestUser() user: User) {
    return this.volunteerService.create({ event: id, user: user._id });
  }
}
