import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Detail {
  @ApiProperty()
  @Prop({ type: String, required: true, default: 'Danh mục thu/chi' })
  name: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: 0 })
  amount: number;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
