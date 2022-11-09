import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  association: string;
}
