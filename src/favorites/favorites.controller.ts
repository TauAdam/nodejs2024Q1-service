import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
  @Post('track/:id')
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.add('tracks', id);
  }
  @Post('artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.add('artists', id);
  }
  @Post('album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.add('albums', id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.remove('tracks', id);
  }
  @HttpCode(204)
  @Delete('artist/:id')
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.remove('artists', id);
  }
  @HttpCode(204)
  @Delete('album/:id')
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.remove('albums', id);
  }
}
