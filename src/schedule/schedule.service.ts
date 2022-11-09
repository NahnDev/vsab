import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule, ScheduleDoc } from './schedules/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private readonly model: Model<ScheduleDoc>,
  ) {}

  async create(dto: CreateScheduleDto) {
    const doc = new this.model({ ...dto });
    await doc.save();
    return doc.toJSON();
  }

  async findAll(filter: { event: string }) {
    const docs = await this.model.find(filter);
    return docs.map((el) => el.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc.toJSON();
  }

  async update(_id: string, dto: UpdateScheduleDto) {
    await this.model.updateOne({ _id }, dto);
    return await this.findOne(_id);
  }

  async remove(_id: string) {
    await this.model.remove({ _id });
  }
}
