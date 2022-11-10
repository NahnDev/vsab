import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Volunteer, VolunteerDoc } from './schemas/volunteer.schema';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectModel(Volunteer.name) private readonly model: Model<VolunteerDoc>,
  ) {}
  async create(dto: CreateVolunteerDto) {
    const doc = new this.model(dto);
    await doc.save();
    return doc.toJSON();
  }

  async findAll(filter: { event: string }) {
    const docs = await this.model.find(filter);
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc.toJSON();
  }

  async update(_id: string, dto: UpdateVolunteerDto) {}

  async remove(_id: string) {
    await this.model.remove({ _id });
  }

  async findByKey(event: string, user: string) {
    const doc = await this.model.findOne({ event, user });
    return doc.toJSON();
  }
  async removeByKey(event: string, user: string) {
    return this.model.remove({ event, user });
  }
}
