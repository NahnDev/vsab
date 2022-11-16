import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsString()
  event: string;
}
