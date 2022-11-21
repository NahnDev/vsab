import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResourceService } from 'src/resource/resource.service';
import { Resource } from 'src/resource/schemas/resource.schema';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package, PackageDoc } from './schemas/package.schema';

export type TFilter = {
  association?: string;
};

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private readonly model: Model<PackageDoc>,
    private readonly resourceService: ResourceService,
  ) {}
  async create(dto: CreatePackageDto) {
    const doc = new this.model(dto);
    await doc.save();
    return await this.findOne(doc._id);
  }

  async findAll(filter: TFilter) {
    const docs = await this.model
      .find({ ...filter, link: false })
      .sort({ at: -1 });
    return docs.map((el) => el.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc.toJSON();
  }

  async update(_id: string, dto: UpdatePackageDto) {
    await this.model.updateOne({ _id }, dto);
    return await this.findOne(_id);
  }

  async remove(_id: string) {
    await this.model.remove({ _id, event: undefined });
  }

  async addFiles(_id: string, file: string) {
    const a = await this.model.updateOne(
      { _id },
      { $addToSet: { files: [file] } },
    );
  }
  async getFiles(_id: string): Promise<Resource[][]> {
    const p = await this.findOne(_id);
    const files = await this.resourceService.findManyByIds(p.files);

    const group: { [name: string]: Resource[] } = {};
    files.forEach((file) => {
      if (!group[file.name]) group[file.name] = [];
      group[file.name].push(file);
    });
    return Object.values(group);
  }
}
