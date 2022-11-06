import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import EUserStatus from 'src/enums/EUserStatus';
import { SocialDto } from 'src/social/dto/social.dto';
import { Social } from 'src/social/schemas/social.schema';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  introduce: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EUserStatus)
  active: EUserStatus;

  @ApiProperty()
  @IsOptional()
  @Type(() => SocialDto)
  social: SocialDto;
}
