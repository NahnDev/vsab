import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './schemas/association.schema';

@PublicApi()
@ApiTags('associations')
@Controller('associations')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}
  @Post()
  @ApiResponse({ type: Association })
  async create(
    @Body() createAssociationDto: CreateAssociationDto,
  ): Promise<Association> {
    return await this.associationService.create(createAssociationDto);
  }

  @Get()
  async findAll() {
    return await this.associationService.findAll();
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
}
