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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicApi()
  @CheckPolicies((ability) => ability.can(Actions.Create, User))
  @ApiOkResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @PublicApi()
  @CheckPolicies((ability) => ability.can(Actions.Read, User))
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @ApiOkResponse({ type: [User] })
  @Get()
  async findAll(@Query('search') search?: string) {
    return await this.userService.findAll(search);
  }

  @PublicApi()
  @ApiOkResponse({ type: User })
  @CheckPolicies((ability) => ability.can(Actions.Read, User))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOkResponse({ type: User })
  @CheckPolicies((ability) => ability.can(Actions.Update, User))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Actions.Delete, User))
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
