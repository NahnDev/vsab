import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { MemberService } from 'src/member/member.service';
import { RoleService } from 'src/role/role.service';
import { Permission } from 'src/role/schemas/role.schema';
import { User } from 'src/user/schemas/user.schema';
import { AssociationGateway } from './association.gateway';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association, AssociationDoc } from './schemas/association.schema';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association.name) private model: Model<AssociationDoc>,
    private readonly socket: AssociationGateway,
    private readonly roleService: RoleService,
    private readonly memberService: MemberService,
  ) {}
  async create(dto: CreateAssociationDto): Promise<Association> {
    const doc = new this.model({ ...dto, uri: `${new Date().getTime()}` });
    await doc.save();
    return await this.findOne(doc._id);
  }

  async findAll(filter: { manager?: string }) {
    if (!filter.manager) filter['block'] = false;
    const docs = (await this.model.find(filter)) || [];
    return docs.map((el) => el.toJSON());
  }

  async findOne(_id: string): Promise<Association> {
    const doc = await this.model.findById(_id);
    const association = doc.toJSON();
    return association;
  }

  async update(_id: string, dto: UpdateAssociationDto) {
    console.log({ _id, ...dto });

    await this.model.updateOne({ _id }, dto);
    return await this.findOne(_id);
  }

  async remove(_id: string) {
    await this.model.remove({ _id });
  }

  async getPermissions(_id: string, user: User) {
    const association = await this.findOne(_id);
    const permissions = await this.roleService.getPermission(
      association._id,
      user._id,
    );
    const mPermissions = await this.roleService.getPermission(
      association.manager,
      user._id,
    );
    return { ...permissions, manager: mPermissions };
  }
}
