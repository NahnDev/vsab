import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExcludeEndpoint, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Resource {
  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: SchemaTypes.ObjectId })
  _id: string;

  @Exclude()
  @Prop({ type: String, required: true })
  path: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  uri: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  mineType: string;

  @ApiProperty()
  @ApiProperty()
  @Prop({ type: Number, required: true, default: () => new Date().getTime() })
  at: number;
}

export type ResourceDoc = Resource & Document;
export const ResourceSchema = SchemaFactory.createForClass(Resource);
ResourceSchema.methods.toJSON = function () {
  return plainToClass(Resource, JSON.parse(JSON.stringify(this.toObject())));
};
