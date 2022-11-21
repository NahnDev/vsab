import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { Finance, FinanceDoc } from './schemas/finance.schema';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Finance.name) private readonly model: Model<FinanceDoc>,
  ) {}
  async create(dto: CreateFinanceDto, user: User) {
    const doc = new this.model({ ...dto, user: user._id });
    await doc.save();
    return this.findOne(doc._id);
  }

  async findAll(filter: {}) {
    const docs = await this.model.find(filter);
    return docs.map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const doc = await this.model.findById(_id);
    return doc?.toJSON();
  }

  async update(_id: string, dto: UpdateFinanceDto) {
    await this.model.updateOne({ _id }, dto);
  }

  async remove(_id: string) {
    await this.model.deleteOne({ _id });
  }
}
