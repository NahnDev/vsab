import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { FollowService } from 'src/follow/follow.service';
import { MemberService } from 'src/member/member.service';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/schemas/user.schema';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './schemas/association.schema';

@ApiTags('associations')
@ApiBearerAuth()
@CheckPolicies()
@Controller('associations')
export class AssociationController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly followService: FollowService,
    private readonly roleService: RoleService,
    private readonly memberService: MemberService,
  ) {}
  @Post()
  @ApiResponse({ type: Association })
  async create(
    @Body() createAssociationDto: CreateAssociationDto,
  ): Promise<Association> {
    return await this.associationService.create(createAssociationDto);
  }

  @Get()
  async findAll(
    @Query('follow') follow: boolean,
    @Query('member') member: boolean,
    @Query('manager') manager: string,
    @RequestUser() user: User,
  ) {
    if (follow) return this.followService.findAllAssociations(user._id);
    if (member) return this.memberService.findAllAssociation(user._id);

    const filter = {};
    if (manager) filter['manager'] = manager;
    return await this.associationService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.associationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAssociationDto,
    @Req() req,
  ) {
    return await this.associationService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.associationService.remove(id);
  }

  // ---------------------- role ----------------------
  @Get(':id/roles')
  async findAllRole(@Param('id') id: string) {
    return await this.roleService.findAll({ association: id });
  }

  // ---------------------- follow ----------------------
  @Post(':id/follow')
  async follow(@Param('id') id: string, @RequestUser() user: User) {
    return await this.followService.follow(id, user._id);
  }

  @Delete(':id/follow')
  async unFollow(@Param('id') id: string, @RequestUser() user: User) {
    return await this.followService.unFollow(id, user._id);
  }

  @Get(':id/followers')
  async getFollows(@Param('id') id: string) {
    return await this.followService.findAllUser(id);
  }

  // ---------------------- member ----------------------
  @Get(':id/members')
  async findAllMember(@Param('id') id: string) {
    return await this.memberService.findAllUser(id);
  }

  @Post(':id/join')
  async join(@Param('id') id: string, @RequestUser() user: User) {
    return await this.memberService.create({ association: id }, user);
  }

  @Delete(':id/leave')
  async leave(@Param('id') id: string, @RequestUser() user: User) {
    const doc = await this.memberService.findByAssociationAndUser(id, user._id);
    return await this.memberService.remove(doc._id);
  }
}
