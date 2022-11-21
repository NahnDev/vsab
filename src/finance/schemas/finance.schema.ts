import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Detail, DetailSchema } from './detail.schema';

@Schema()
export class Finance {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'Báo cáo kinh phí mới' })
  name: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  desc: string;

  @ApiProperty()
  @Prop({ type: [DetailSchema], default: [], required: true })
  details: Detail[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @ApiProperty()
  @Prop({ type: Number, default: () => new Date().getTime(), required: true })
  at: number;
}

export type FinanceDoc = Finance & Document;
export const FinanceSchema = SchemaFactory.createForClass(Finance);
FinanceSchema.methods.toJSON = function () {
  return plainToClass(Finance, JSON.parse(JSON.stringify(this.toObject())));
};
