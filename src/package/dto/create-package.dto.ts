import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty()
  @IsString()
  association: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
}
