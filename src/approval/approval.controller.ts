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
import { User, UserDoc } from 'src/user/schemas/user.schema';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import ReviewDto from './dto/review.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@ApiBearerAuth()
@ApiTags('approvals')
@CheckPolicies()
@Controller('approvals')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  @Post()
  create(@Body() dto: CreateApprovalDto, @RequestUser() user: User) {
    return this.approvalService.create(dto, user);
  }

  @Get()
  @ApiQuery({ type: 'string', name: 'association' })
  findAll(@Query('association') association: string) {
    const filter = {};
    if (filter['association']) filter['association'] = association;
    return this.approvalService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.approvalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApprovalDto: UpdateApprovalDto,
  ) {
    return this.approvalService.update(id, updateApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.approvalService.remove(id);
  }

  @Post(':id/reject')
  reject(
    @Param('id') id: string,
    @Body() dto: ReviewDto,
    @RequestUser() user: User,
  ) {
    return this.approvalService.reject(id, dto, user);
  }

  @Post(':id/submit')
  submit(
    @Param('id') id: string,
    @Body() dto: ReviewDto,
    @RequestUser() user: User,
  ) {
    return this.approvalService.submit(id, dto, user);
  }

  @Post(':id/approved')
  approved(
    @Param('id') id: string,
    @Body() dto: ReviewDto,
    @RequestUser() user: User,
  ) {
    return this.approvalService.approved(id, dto, user);
  }
}
