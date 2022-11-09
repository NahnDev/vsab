import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { pid } from 'src/constants/PID';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Resource } from './schemas/resource.schema';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { join } from 'path';
import { diskStorage, memoryStorage } from 'multer';
import { ApiForm } from 'src/decorators/api-form.decorator';
import { UseMulterInterceptor } from 'src/interceptors/multer.interceptor';

@PublicApi()
@ApiTags('resources')
@ApiBasicAuth()
@CheckPolicies((ability) => ability.can(Actions.Manage, Resource))
@Controller([`/resources`])
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @ApiOkResponse({ type: Resource })
  @ApiConsumes('multipart/form-data')
  @ApiForm({
    file: {
      type: 'string',
      format: 'binary',
    },
  })
  @UseMulterInterceptor()
  create(@UploadedFile() file: Express.Multer.File) {
    return this.resourceService.create(file);
  }

  @ApiOkResponse({ type: [Resource] })
  @Get()
  async findAll() {
    return await this.resourceService.findAll();
  }

  @ApiOkResponse({ type: Resource })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('download') download?: boolean,
  ) {
    const file = await this.resourceService.findOne(id);
    if (download) {
      const fileStream = createReadStream(file.path);
      return new StreamableFile(fileStream);
    }
    return file;
  }

  @ApiOkResponse()
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { dest: './store' }))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.resourceService.update(id, { path: file.path });
  }

  @ApiOkResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.resourceService.remove(id);
  }
}

// ---------------------------------
