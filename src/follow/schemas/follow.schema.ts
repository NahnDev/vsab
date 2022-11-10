import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Follow {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Association.name, required: true })
  association: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: () => new Date().getTime() })
  at: number;
}

export type FollowDoc = Follow & Document;
export const FollowSchema = SchemaFactory.createForClass(Follow);
FollowSchema.methods.toJSON = function () {
  return plainToClass(Follow, JSON.parse(JSON.stringify(this.toObject())));
};
