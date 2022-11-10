import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { $gt } from '@ucast/mongo';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDoc } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private readonly model: Model<PostDoc>) {}

  async create(dto: CreatePostDto, user?: User) {
    const doc = new this.model({ ...dto, sender: user?._id });
    await doc.save();
    return this.findOne(doc._id);
  }

  async findAll(filter: {
    wait?: boolean;
    publish?: boolean;
    association: string;
  }) {
    const { wait, ...otherFilter } = filter;
    const current = new Date().getTime();
    const docs = await this.model
      .find({
        at: filter.wait ? { $gt: current } : { $lt: current },
        ...otherFilter,
      })
      .sort({ at: -1 });
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc.toJSON();
  }

  async update(_id: string, updatePostDto: UpdatePostDto) {
    await this.model.updateOne({ _id }, updatePostDto);
    return await this.findOne(_id);
  }

  async remove(_id: string) {
    await this.model.remove({ _id });
  }

  async like(_id: string, user: User) {
    await this.model.updateOne({ _id }, { $addToSet: { likes: [user._id] } });
  }
  async unlike(_id: string, user: User) {
    await this.model.updateOne({ _id }, { $pull: { likes: user._id } });
  }

  async publish(_id: string) {
    await this.model.updateOne({ _id }, { publish: true });
  }
  async unpublish(_id: string) {
    await this.model.updateOne({ _id }, { publish: false });
  }
}
