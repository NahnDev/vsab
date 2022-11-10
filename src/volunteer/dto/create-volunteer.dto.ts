import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVolunteerDto {
  @ApiProperty()
  @IsString()
  event: string;

  @ApiProperty()
  @IsString()
  user: string;
}
