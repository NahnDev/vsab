import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { Event } from 'src/event/schemas/event.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Post {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: '' })
  content: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Association.name })
  association: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Event.name })
  event: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  sender?: string;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: User.name,
  })
  likes: string[];

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: User.name,
  })
  comments: string[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  publish: boolean;

  @ApiProperty()
  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
    default: () => new Date().getTime(),
  })
  at: number;
}

export type PostDoc = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.methods.toJSON = function () {
  return plainToClass(Association, JSON.parse(JSON.stringify(this.toObject())));
};
