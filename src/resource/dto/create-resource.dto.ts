import { IsString, IsEnum } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  path: string;

  @IsString()
  name: string;

  @IsString()
  uri: string;

  @IsString()
  mineType: string;
}
