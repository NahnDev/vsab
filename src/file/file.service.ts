import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileDoc } from './schemas/file.schema';
import { unlinkSync } from 'fs';
import { File } from './schemas/file.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDoc>,
  ) {}
  async create(createFileDto: CreateFileDto) {
    const fileModel = new this.fileModel(createFileDto);
    await fileModel.save();
    return await this.findOne(fileModel._id.toHexString());
  }

  async findAll() {
    const fileDocs = await this.fileModel.find({});
    return fileDocs.map((doc) => doc.toJSON());
  }

  async findOne(id: string) {
    const fileDoc = await this.fileModel.findById(id);
    return fileDoc.toJSON();
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.findOne(id);
    if (!file) return;
    unlinkSync(file.path);
    await this.fileModel.updateOne({ _id: id }, { path: updateFileDto.path });
  }

  async remove(id: string) {
    const file = await this.findOne(id);
    if (!file) return;
    unlinkSync(file.path);
    await this.fileModel.remove({ _id: id });
  }
}
