import { IsString } from 'class-validator';

export class UpdateFileDto {
  @IsString()
  path: string;
}
