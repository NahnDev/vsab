import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  association: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  event?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  at: number;
}
