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
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import TFilter from './types/TFilter';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';

@ApiTags('Volunteers')
@CheckPolicies()
@ApiBearerAuth()
@Controller('volunteers')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @Get()
  @PublicApi()
  @ApiQuery({ type: 'string', name: 'event' })
  findAll(@Query('event') event: string) {
    const filter: TFilter = {};
    if (event) filter['event'] = event;
    return this.volunteerService.findAll(filter);
  }

  @Get(':id')
  @PublicApi()
  findOne(@Param('id') id: string) {
    return this.volunteerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(id, updateVolunteerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerService.remove(id);
  }
}
