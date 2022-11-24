import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsObject,
  isObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import PermissionDto from './permission.dto';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  association: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionDto)
  permission: PermissionDto;
}
