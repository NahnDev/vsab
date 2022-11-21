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
    const packageDto = {
      association: dto.association,
      name: 'New Event',
      link: true,
    };
    const pack = await this.packageService.create(packageDto);
    const doc = new this.model({ ...dto, package: pack._id });
    await doc.save();

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
    await this.model.updateOne({ _id }, { name });
    const event = await this.findOne(_id);
    await this.packageService.update(event.package, { name: name });
  }

  async publish(_id: string) {
    await this.model.updateOne({ _id }, { status: EEventStatus.PUBLIC });
  }

  async unpublish(_id: string) {
    await this.model.updateOne({ _id }, { status: EEventStatus.BLOCK });
  }
}
