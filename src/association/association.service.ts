import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association, AssociationDoc } from './schemas/association.schema';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association.name) private model: Model<AssociationDoc>,
  ) {}
  async create(dto: CreateAssociationDto): Promise<Association> {
    const doc = new this.model(dto);
    await doc.save();
    return await this.findOne(doc._id);
  }

  async findAll() {
    const docs = (await this.model.find({})) || [];
    return docs.map((el) => el.toJSON());
  }

  async findOne(_id: string): Promise<Association> {
    const doc = await this.model.findById(_id);
    const association = doc.toJSON();
    return association;
  }

  async update(_id: string, dto: UpdateAssociationDto) {
    console.log({ _id, ...dto });

    await this.model.updateOne({ _id }, dto);
    return await this.findOne(_id);
  }

  async remove(_id: string) {
    await this.model.remove({ _id });
  }
}
