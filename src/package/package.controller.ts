import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ResourceService } from 'src/resource/resource.service';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiForm } from 'src/decorators/api-form.decorator';
import { UseMulterInterceptor } from 'src/interceptors/multer.interceptor';
import { Multer } from 'multer';
import { Resource } from 'src/resource/schemas/resource.schema';
import { PublicApi } from 'src/decorators/public-api.decorator';

@PublicApi()
@ApiTags('Packages')
@Controller('packages')
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
    private readonly resourceService: ResourceService,
  ) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  @ApiQuery({ name: 'association', type: 'string' })
  findAll(@Query('association') association: string) {
    return this.packageService.findAll({ association });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }

  @Get(':id/files')
  @ApiResponse({ type: 'array' })
  findAllFiles(@Param('id') id: string) {
    return this.packageService.getFiles(id);
  }

  @Post(':id/files')
  @ApiResponse({ type: Resource })
  @ApiConsumes('multipart/form-data')
  @ApiForm({
    file: {
      type: 'string',
      format: 'binary',
    },
  })
  @UseMulterInterceptor()
  async addFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const res = await this.resourceService.create(file);
    await this.packageService.addFiles(id, res._id);
    return res;
  }
}
