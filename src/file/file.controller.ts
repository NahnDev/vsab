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
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { pid } from 'src/constants/PID';
import { UpdateFileDto } from './dto/update-file.dto';
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { File } from './schemas/file.schema';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { join } from 'path';
import { diskStorage, memoryStorage } from 'multer';

@PublicApi()
@ApiTags('files')
@ApiBasicAuth()
@CheckPolicies((ability) => ability.can(Actions.Manage, File))
@Controller([`/files`])
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiOkResponse({ type: File })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(process.cwd(), 'public', 'static'));
        },
        filename: (req, file, cb) => {
          cb(
            null,
            `${Date.now() + Math.random().toString().substring(2, 6)}_${
              file.originalname
            }`,
          );
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    const createFileDto = new CreateFileDto();

    createFileDto.name = file.originalname;
    createFileDto.path = file.path;
    createFileDto.uri = `/static/${file.filename}`;
    createFileDto.mineType = file.mimetype;
    return this.fileService.create(createFileDto);
  }

  @ApiOkResponse({ type: [File] })
  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @ApiOkResponse({ type: File })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('download') download?: boolean,
  ) {
    const file = await this.fileService.findOne(id);
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
    return await this.fileService.update(id, { path: file.path });
  }

  @ApiOkResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.fileService.remove(id);
  }
}
