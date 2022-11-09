import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const p = await this.packageService.create({
      association: dto.association,
    });
    const doc = new this.model({ ...dto, package: p._id });
    await doc.save();
    return doc.toJSON();
  }

  async findAll(filter: { association: string }) {
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
    const event = await this.findOne(_id);
    await this.packageService.update(event.package, { name });
    await this.model.updateOne({ _id }, { name });
  }

  async addPost(_id: string, dto: CreatePostDto) {
    const post = await this.postService.create(dto);
    await this.model.updateOne({ _id }, { $addToSet: { posts: [post._id] } });
    return await this.findOne(_id);
  }

  async removePost(_id: string, post: string) {
    await this.postService.remove(post);
    await this.model.updateOne({ _id }, { $pull: { posts: [post] } });
  }
}
