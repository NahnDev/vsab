import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { Role } from 'src/role/schemas/role.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Member {
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
  @Prop({ type: SchemaTypes.ObjectId, ref: Role.name })
  role: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: () => new Date().getTime() })
  at: number;
}

export type MemberDoc = Member & Document;
export const MemberSchema = SchemaFactory.createForClass(Member);
MemberSchema.methods.toJSON = function () {
  return plainToClass(Member, JSON.parse(JSON.stringify(this.toObject())));
};
