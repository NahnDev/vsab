import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Social {
  @ApiProperty()
  @Prop({ type: String, required: true, default: '' })
  facebook: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: '' })
  youtube: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: '' })
  twitter: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: '' })
  tiktok: string;
}
