import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
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
  introduction: string;

  @ApiProperty()
  @IsObject()
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
}
