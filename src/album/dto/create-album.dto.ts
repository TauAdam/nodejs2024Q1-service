import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsString()
  @IsOptional()
  artistId: string | null;
}
