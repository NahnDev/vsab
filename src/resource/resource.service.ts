import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { unlinkSync } from 'fs';
import { Resource, ResourceDoc } from './schemas/resource.schema';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name)
    private readonly resourceModel: Model<ResourceDoc>,
  ) {}
  async create(file: Express.Multer.File) {
    const dto = new CreateResourceDto();
    dto.name = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    dto.path = file.path;
    dto.uri = `/static/${file.filename}`;
    dto.mineType = file.mimetype;
    console.log({ file });

    const resourceModel = new this.resourceModel(dto);
    await resourceModel.save();
    return await this.findOne(resourceModel._id.toString());
  }

  async findAll() {
    const resourceDocs = await this.resourceModel.find({});
    return resourceDocs.map((doc) => doc.toJSON());
  }

  async findOne(id: string) {
    const resourceDoc = await this.resourceModel.findById(id);
    return resourceDoc.toJSON();
  }

  async update(id: string, updateFileDto: UpdateResourceDto) {
    const resource = await this.findOne(id);
    if (!resource) return;
    unlinkSync(resource.path);
    await this.resourceModel.updateOne(
      { _id: id },
      { path: updateFileDto.path },
    );
  }

  async remove(id: string) {
    const resource = await this.findOne(id);
    if (!resource) return;
    unlinkSync(resource.path);
    await this.resourceModel.remove({ _id: id });
  }

  async findManyByIds(ids: string[]) {
    const docs = await this.resourceModel.find({ _id: { $in: ids } });
    return docs.map((doc) => doc.toJSON());
  }
}
