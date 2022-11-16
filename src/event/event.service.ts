import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import EEventStatus from 'src/enums/EEventStatus';
import { PackageService } from 'src/package/package.service';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { PostService } from 'src/post/post.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDoc } from './schemas/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly model: Model<EventDoc>,
    private readonly postService: PostService,
    private readonly packageService: PackageService,
  ) {}

  async create(dto: CreateEventDto) {
    const doc = new this.model({ ...dto });
    await doc.save();
    const p = await this.packageService.create({
      association: dto.association,
      event: doc._id,
    });
    return doc.toJSON();
  }

  async findAll(filter: { association?: string }) {
    const docs = await this.model.find(filter);
    return docs.map((el) => el.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc.toJSON();
  }

  async update(_id: string, dto: UpdateEventDto) {
    if (dto.name) await this.rename(_id, dto.name);
    await this.model.updateOne({ _id }, dto);
    return await this.findOne(_id);
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
  async rename(_id: string, name: string) {
    const packages = await this.packageService.findAll({ event: _id });
    for (const p of packages) {
      await this.packageService.update(p._id, { name: name });
    }
    await this.model.updateOne({ _id }, { name });
  }

  async publish(_id: string) {
    await this.model.updateOne({ _id }, { status: EEventStatus.PUBLIC });
  }

  async unpublish(_id: string) {
    await this.model.updateOne({ _id }, { status: EEventStatus.BLOCK });
  }

  
}
