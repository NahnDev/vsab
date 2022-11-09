import { IsString } from 'class-validator';

export class UpdateResourceDto {
  @IsString()
  path: string;
}
