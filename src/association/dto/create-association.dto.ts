import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAssociationDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  uri?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  manager?: string;
}
