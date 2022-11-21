import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@ApiBearerAuth()
@ApiTags('finances')
@CheckPolicies()
@Controller('finances')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  create(@Body() dto: CreateFinanceDto, @RequestUser() user: User) {
    return this.financeService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.financeService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financeService.update(id, updateFinanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financeService.remove(id);
  }
}
