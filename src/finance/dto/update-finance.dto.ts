import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, isArray, IsOptional, IsString } from 'class-validator';
import { CreateFinanceDto } from './create-finance.dto';

export class UpdateFinanceDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => Detail)
  detail?: Detail[];
}

class Detail {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  amount?: string;
}
