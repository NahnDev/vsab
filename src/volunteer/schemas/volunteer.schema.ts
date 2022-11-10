import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Volunteer {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: Event.name, required: true })
  event: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: () => new Date().getTime() })
  at: number;
}

export type VolunteerDoc = Volunteer & Document;
export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
VolunteerSchema.methods.toJSON = function () {
  return plainToClass(Volunteer, JSON.parse(JSON.stringify(this.toObject())));
};
