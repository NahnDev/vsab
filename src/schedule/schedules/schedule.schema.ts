import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Event } from 'src/event/schemas/event.schema';

@Schema()
export class Schedule {
  @Transform(({ value }) => value.toString())
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'New schedule' })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'Description' })
  description: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Event.name })
  event: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  at: number;
}

export type ScheduleDoc = Schedule & Document;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
ScheduleSchema.methods.toJSON = function () {
  return plainToClass(Schedule, JSON.parse(JSON.stringify(this.toObject())));
};
