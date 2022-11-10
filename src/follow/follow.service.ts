import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Follow, FollowDoc } from './schemas/follow.schema';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name) private readonly model: Model<FollowDoc>,
  ) {}
  async follow(association: string, user: User['_id']) {
    const doc = new this.model({ association, user });
    await doc.save();
    return doc.toJSON();
  }

  async unFollow(association: string, user: User['_id']) {
    await this.model.remove({ association, user });
  }

  async findAllAssociations(user: User['_id']) {
    const docs = await this.model.find({ user });
    return docs.map((doc) => doc.toJSON());
  }

  async findAllUser(association: string) {
    const docs = await this.model.find({ association });
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(user: User['_id'], association: Association['_id']) {
    const doc = await this.model.findOne({ user, association });
    return doc?.toJSON();
  }

  async isFollowed(association: string, user: User['_id']) {
    const docs = await this.model.find({ association, user });
    return docs.length > 0;
  }
}
