import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDoc } from './schemas/comment.schemas';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly model: Model<CommentDoc>,
  ) {}

  async create(dto: CreateCommentDto, user: User) {
    const doc = new this.model({ ...dto, sender: user._id });
    await doc.save();
    return this.findOne(doc._id);
  }

  async findAll(filter: { post: string }) {
    const current = new Date().getTime();
    const docs = await this.model.find(filter).sort({ at: -1 });
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc.toJSON();
  }

  async update(_id: string, updatePostDto: UpdateCommentDto) {
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
}
