import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiExcludeEndpoint, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass, Transform } from 'class-transformer';
import { SchemaType, SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';
import EEventStatus from 'src/enums/EEventStatus';
import { Package } from 'src/package/schemas/package.schema';
import { Post } from 'src/post/schemas/post.schema';
import { Resource } from 'src/resource/schemas/resource.schema';

@Schema()
export class Event {
  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: SchemaTypes.ObjectId })
  _id: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Association.name })
  association: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'New Event' })
  name: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: () => new Date().getTime() })
  at: number;

  @ApiProperty()
  @Prop({
    type: String,
    enum: EEventStatus,
    required: true,
    default: EEventStatus.PRIVATE,
  })
  status: EEventStatus;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Package.name })
  package: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Resource.name })
  banner: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  introduce: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  content: string;
}

export type EventDoc = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.methods.toJSON = function () {
  return plainToClass(Event, JSON.parse(JSON.stringify(this.toObject())));
};
