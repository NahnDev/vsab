import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import EApprovalStatus from 'src/enums/EApprovalStatus';

export default class ReviewDto {
  @ApiProperty()
  @IsString()
  desc: string;
}
