import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto {
  @ApiProperty()
  @IsString()
  role: string;
}
