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
  createTrack(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.favoritesService.addTrack(id);
  }
  @Post('artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.favoritesService.addArtist(id);
  }
  @Post('album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.favoritesService.addAlbum(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrack(id);
  }
  @HttpCode(204)
  @Delete('artist/:id')
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtist(id);
  }
  @HttpCode(204)
  @Delete('album/:id')
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
