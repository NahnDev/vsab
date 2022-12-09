import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { MemberService } from 'src/member/member.service';
import { User } from 'src/user/schemas/user.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDoc } from './schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly model: Model<RoleDoc>,
    private readonly memberService: MemberService,
  ) {}
  async create(dto: CreateRoleDto) {
    const doc = new this.model(dto);
    await doc.save();
    return doc.toJSON();
  }

  async findAll(filter: { association: string }) {
    const docs = await this.model.find(filter);
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc?.toJSON();
  }

  async update(_id: string, dto: UpdateRoleDto) {
    await this.model.updateOne({ _id }, dto);
    return this.findOne(_id);
  }

  async remove(_id: string) {
    await this.model.remove({ _id });
    await this.memberService.removeRole(_id);
  }

  async getPermission(association: Association['_id'], user: User['_id']) {
    let permissions = {};
    const member = await this.memberService.findByAssociationAndUser(
      association,
      user,
    );
    if (!member) return permissions;

    permissions = { ...permissions, member: true };
    const role = await this.findOne(member.role);
    if (!role) return permissions;
    return { ...permissions, ...role.permission };
  }
}
