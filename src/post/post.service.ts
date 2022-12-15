import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { $gt } from '@ucast/mongo';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostGateway } from './post.gateway';
import { Post, PostDoc } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly model: Model<PostDoc>,
    private readonly socket: PostGateway,
  ) {}

  async create(dto: CreatePostDto, user?: User) {
    const doc = new this.model({ ...dto, sender: user?._id });
    await doc.save();
    const post = await this.findOne(doc._id);
    return post;
  }

  async findAll(
    filter: {
      association?: string;
      event?: string;
    },
    admin?: boolean,
  ) {
    const current = new Date().getTime();

    const docs = await this.model
      .find({
        ...filter,
        ...(admin
          ? { publish: false }
          : { publish: true, at: { $lt: current } }),
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
    this.socket.onDeleted(_id)
  }

  async like(_id: string, user: User) {
    this.socket.onLike(_id);
    await this.model.updateOne({ _id }, { $addToSet: { likes: [user._id] } });
  }
  async unlike(_id: string, user: User) {
    this.socket.onLike(_id);
    await this.model.updateOne({ _id }, { $pull: { likes: user._id } });
  }

  async publish(_id: string) {
    const post = await this.findOne(_id);
    this.socket.onCreated(post.association, post);

    await this.model.updateOne(
      { _id },
      { publish: true, at: new Date().getTime() },
    );
  }
  async unpublish(_id: string) {
    await this.model.updateOne({ _id }, { publish: false });
  }
}
