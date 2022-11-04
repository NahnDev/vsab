import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import EUserStatus from 'src/enums/EUserStatus';
import { SocialDto } from 'src/social/dto/social.dto';
import { Social } from 'src/social/schemas/social.schema';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {
  @ApiProperty()
  @IsString()
  introduce: string;

  @ApiProperty()
  @IsString()
  short: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEnum(EUserStatus)
  active: EUserStatus;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @Type(() => SocialDto)
  social: SocialDto;
}
