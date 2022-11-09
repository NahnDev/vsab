import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import { Post } from 'src/post/schemas/post.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Comment {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    default: '',
  })
  content: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Post.name,
  })
  post: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: User.name,
  })
  sender: string;

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
    type: Number,
    required: true,
    default: () => new Date().getTime(),
  })
  at: number;
}

export type CommentDoc = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.methods.toJSON = function () {
  return plainToClass(Association, JSON.parse(JSON.stringify(this.toObject())));
};
