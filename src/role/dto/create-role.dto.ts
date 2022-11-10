import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import PermissionDto from './permission.dto';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  association: string;


}
