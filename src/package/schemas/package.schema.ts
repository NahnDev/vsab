import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Approval } from 'src/approval/schemas/approval.schema';
import { Association } from 'src/association/schemas/association.schema';
import { Event } from 'src/event/schemas/event.schema';
import { Finance } from 'src/finance/schemas/finance.schema';
import { Resource } from 'src/resource/schemas/resource.schema';

@Schema()
export class Package {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: '#ff8a8a' })
  color: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'New package' })
  name: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Association.name })
  association: string;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    ref: Resource.name,
    default: [],
  })
  files: string[];

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  link: boolean;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: () => new Date().getTime() })
  at: number;
}

export type PackageDoc = Package & Document;
export const PackageSchema = SchemaFactory.createForClass(Package);
PackageSchema.methods.toJSON = function () {
  return plainToClass(Package, JSON.parse(JSON.stringify(this.toObject())));
};
