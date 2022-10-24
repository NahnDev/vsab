import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Emit {
  @Prop({ type: String, ref: 'User', required: true })
  uId: string;

  @Prop({ type: String, required: true })
  ev: string;

  @Prop({ type: SchemaTypes.Mixed })
  args: any;
}

export type EmitDoc = Emit & Document;
export const EmitSchema = SchemaFactory.createForClass(Emit);
EmitSchema.methods.toJSON = function (): Emit {
  return plainToClass(Emit, JSON.parse(JSON.stringify(this.toObject())));
};
