import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import EApprovalStatus from 'src/enums/EApprovalStatus';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Review {
  @ApiProperty()
  @Prop({ type: String, enum: EApprovalStatus, required: true })
  status: EApprovalStatus;

  @ApiProperty()
  @IsOptional()
  @Prop({ type: String, required: true })
  desc?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @ApiProperty()
  @Prop({ type: Number, default: () => new Date().getTime(), required: true })
  at: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
