import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiOAuth2, ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Social } from 'src/social/schemas/social.schema';

@Schema()
export class Association {
  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: SchemaTypes.ObjectId })
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Association.name })
  manager: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  uri: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  introduction: string;

  @ApiProperty()
  @Prop({
    type: Social,
    required: true,
    default: { facebook: '', twitter: '', youtube: '', tiktok: '' },
  })
  social: Social;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], default: [] })
  images: string[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId })
  logo: string;

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  block: boolean;
}

export type AssociationDoc = Association & Document;
export const AssociationSchema = SchemaFactory.createForClass(Association);
AssociationSchema.methods.toJSON = function () {
  return plainToClass(Association, JSON.parse(JSON.stringify(this.toObject())));
};
