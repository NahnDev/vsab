import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import EApprovalStatus from 'src/enums/EApprovalStatus';
import { PackageService } from 'src/package/package.service';
import { User } from 'src/user/schemas/user.schema';
import { CreateApprovalDto } from './dto/create-approval.dto';
import ReviewDto from './dto/review.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { Approval, ApprovalDoc } from './schemas/approval.schema';
import { Review } from './schemas/review.schema';

@Injectable()
export class ApprovalService {
  constructor(
    @InjectModel(Approval.name) private readonly model: Model<ApprovalDoc>,
    private readonly packageService: PackageService,
  ) {}
  async create(dto: CreateApprovalDto, user: User) {
    const name = 'Đề nghị phê duyệt mới';
    const pack = await this.packageService.create({ name, ...dto, link: true });
    const doc = new this.model({
      ...dto,
      package: pack._id,
      user: user._id,
    });
    await doc.save();
    return this.findOne(doc._id);
  }

  async findAll(filter: { association?: string }) {
    const docs = await this.model.find(filter);
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc?.toJSON();
  }

  async update(_id: string, dto: UpdateApprovalDto) {
    await this.model.updateOne({ _id, block: false }, dto);
    const approval = await this.findOne(_id);
    if (dto.name)
      await this.packageService.update(approval._id, { name: dto.name });
    return approval;
  }

  async remove(_id: string) {
    await this.model.deleteOne({ _id });
  }

  async reject(_id: string, dto: ReviewDto, user: User) {
    await this.model.updateOne(
      { _id, block: false },
      {
        $push: {
          reviews: { ...dto, status: EApprovalStatus.REJECT, user: user._id },
        },
      },
    );
  }
  async approved(_id: string, dto: ReviewDto, user: User) {
    await this.model.updateOne(
      { _id, block: false },
      {
        $push: {
          reviews: { ...dto, status: EApprovalStatus.APPROVED, user: user._id },
        },
        block: true,
      },
    );
  }
  async submit(_id: string, dto: ReviewDto, user: User) {
    await this.model.updateOne(
      { _id, block: false },
      {
        $push: {
          reviews: { ...dto, status: EApprovalStatus.SUBMIT, user: user._id },
        },
      },
    );
  }
}
