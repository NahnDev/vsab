import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export default class PermissionDto {
  @ApiProperty()
  @IsBoolean()
  manager: boolean;
}
