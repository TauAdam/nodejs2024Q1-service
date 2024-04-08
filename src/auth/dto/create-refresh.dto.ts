import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
