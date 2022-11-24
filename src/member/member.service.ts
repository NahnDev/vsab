import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member, MemberDoc } from './schemas/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private readonly model: Model<MemberDoc>,
  ) {}

  async create(dto: CreateMemberDto, user: User) {
    const doc = new this.model({ user: user['_id'], ...dto });
    await doc.save();
    return doc.toJSON();
  }

  async findAllUser(association: Association['_id']) {
    const docs = await this.model.find({ association });
    console.log(docs);

    return docs.map((doc) => doc.toJSON());
  }

  async findAllAssociation(user: User['_id']) {
    const docs = await this.model.find({ user });
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc?.toJSON();
  }

  async findByAssociationAndUser(
    association: Association['_id'],
    user: User['_id'],
  ) {
    const doc = await this.model.findOne({ association, user });
    return doc?.toJSON();
  }

  async update(_id: string, dto: UpdateMemberDto) {
    if (dto.role === '') dto.role = null;
    await this.model.updateOne({ _id }, dto);
    return await this.findOne(_id);
  }

  async remove(_id) {
    await this.model.remove({ _id });
  }
}
