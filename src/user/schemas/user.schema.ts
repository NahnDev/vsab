import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import ERole from 'src/enums/ERole';
import { EUserStatus } from 'src/enums/EUserStatus';
import { Resource } from 'src/resource/schemas/resource.schema';
import { Social } from 'src/social/schemas/social.schema';

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  introduce: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  phone: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  fullName: string;

  @ApiProperty()
  @Prop()
  code: string;

  @ApiProperty()
  @Prop()
  address: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Resource.name })
  avatar: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  email: string;

  @Exclude()
  @Prop({ type: String, required: true, select: false })
  password: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: EUserStatus,
    required: true,
    default: EUserStatus.ACTIVE,
  })
  active: EUserStatus;

  @ApiProperty()
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isAdmin: boolean;

  roles: ERole;

  @ApiProperty()
  @Prop({
    type: Social,
    required: true,
    default: { facebook: '', twitter: '', youtube: '', tiktok: '' },
  })
  social: Social;
}

export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function (): User {
  return plainToClass(User, JSON.parse(JSON.stringify(this.toObject())));
};
