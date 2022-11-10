import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';
import PermissionDto from './permission.dto';

export class UpdateRoleDto extends PartialType(
  PickType(CreateRoleDto, ['name']),
) {
  @ApiProperty()
  @Type(() => PermissionDto)
  permission: string;
}
