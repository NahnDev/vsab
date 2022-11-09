import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAssociationDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  uri: string;
}
