import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { FavoritesCategory } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly repository: RepositoryService) {}

  add(collectionType: keyof FavoritesCategory, id: string) {
    const res = this.repository.hasEntity(collectionType, id);
    if (!res) {
      throw new UnprocessableEntityException(
        `This ${collectionType.slice(0, -1)} doesn't exist`,
      );
    }
    return this.repository.favorites.add(collectionType, id);
  }

  findAll() {
    const { artists, albums, tracks } = this.repository.favorites;
    const result = {
      artists: this.repository.artists.filter((artist) =>
        artists.includes(artist.id),
      ),
      albums: this.repository.albums.filter((album) =>
        albums.includes(album.id),
      ),
      tracks: this.repository.tracks.filter((track) =>
        tracks.includes(track.id),
      ),
    };
    return result;
  }

  remove(collectionType: keyof FavoritesCategory, id: string) {
    if (!this.repository.favorites.has(collectionType, id)) {
      throw new NotFoundException(
        `This ${collectionType.slice(0, -1)} doesn't exist in favorites`,
      );
    }
    this.repository.favorites.remove(collectionType, id);
  }
}
