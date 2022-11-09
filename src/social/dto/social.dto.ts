import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class SocialDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  facebook: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  youtube: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  twitter: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tiktok: string;
}
