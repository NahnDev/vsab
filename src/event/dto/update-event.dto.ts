import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import EEventStatus from 'src/enums/EEventStatus';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  introduce: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  banner: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EEventStatus)
  status: EEventStatus;
}
