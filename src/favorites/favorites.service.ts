import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { Favorites } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly repository: RepositoryService) {}

  create(collectionType: keyof Favorites, id: string) {
    if (this.repository.isEntityExist(collectionType, id)) {
      throw new NotFoundException(
        `This ${collectionType.slice(0, -1)} doesn't exist`,
      );
    }
    this.repository.favorites[collectionType].push(id);
  }

  findAll() {
    const favoritesIdx = this.repository.favorites;
    return {
      artists: this.repository.artists.filter((artist) =>
        favoritesIdx.artists.includes(artist.id),
      ),
      albums: this.repository.albums.filter((album) =>
        favoritesIdx.albums.includes(album.id),
      ),
      tracks: this.repository.tracks.filter((track) =>
        favoritesIdx.tracks.includes(track.id),
      ),
    };
  }

  remove(collectionType: keyof Favorites, id: string) {
    if (!this.repository.favorites[collectionType].includes(id)) {
      throw new NotFoundException(
        `This ${collectionType.slice(0, -1)} doesn't exist in favorites`,
      );
    }
    this.repository.removeFavorite(collectionType, id);
  }
}
