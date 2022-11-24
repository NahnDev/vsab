import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export default class PermissionDto {
  @ApiProperty()
  @IsBoolean()
  general: boolean;

  @ApiProperty()
  @IsBoolean()
  unit: boolean;

  @ApiProperty()
  @IsBoolean()
  event: boolean;

  @ApiProperty()
  @IsBoolean()
  doc: boolean;

  @ApiProperty()
  @IsBoolean()
  member: boolean;

  @ApiProperty()
  @IsBoolean()
  post: boolean;

  @ApiProperty()
  @IsBoolean()
  finance: boolean;

  @ApiProperty()
  @IsBoolean()
  approval: boolean;
}
