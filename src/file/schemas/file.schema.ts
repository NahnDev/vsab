import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExcludeEndpoint, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class File {
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
}

export type FileDoc = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.methods.toJSON = function () {
  return plainToClass(File, JSON.parse(JSON.stringify(this.toObject())));
};
