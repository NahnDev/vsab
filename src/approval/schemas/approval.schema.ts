import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPreconditionFailedResponse, ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { Resource } from 'src/resource/schemas/resource.schema';
import { User } from 'src/user/schemas/user.schema';
import { Review, ReviewSchema } from './review.schema';

@Schema()
export class Approval {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'Đề nghị phê duyệt mới' })
  name: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  desc: string;

  @ApiProperty()
  @Prop({ type: [ReviewSchema], required: true, default: [] })
  reviews: Review[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Association.name, required: true })
  association: string;

  @ApiProperty()
  @Prop({ type: Boolean, default: false, required: true })
  block: boolean;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  package: string;

  @ApiProperty()
  @Prop({ type: Number, default: () => new Date().getTime(), required: true })
  at: number;
}

export type ApprovalDoc = Approval & Document;
export const ApprovalSchema = SchemaFactory.createForClass(Approval);
ApprovalSchema.methods.toJSON = function () {
  return plainToClass(Approval, JSON.parse(JSON.stringify(this.toObject())));
};
