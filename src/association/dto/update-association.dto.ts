import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SocialDto } from 'src/social/dto/social.dto';
import { CreateAssociationDto } from './create-association.dto';

export class UpdateAssociationDto extends PartialType(CreateAssociationDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  introduction: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  @Type(() => SocialDto)
  social: SocialDto;

  @ApiProperty()
  @IsArray()
  @Type(() => String)
  @IsOptional()
  images: string[];

  @IsString()
  @ApiProperty()
  @IsOptional()
  logo: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  block: boolean;
}
