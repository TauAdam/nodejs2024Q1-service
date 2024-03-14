import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { RepositoryResources } from 'src/types';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RepositoryService {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public favorites: Favorites = { tracks: [], albums: [], artists: [] };

  findOne(collectionType: RepositoryResources, id: string) {
    const record = this[collectionType].find((el) => el.id === id);
    if (!record) {
      throw new NotFoundException(
        `This ${collectionType.slice(0, -1)} doesn't exist`,
      );
    }
    return record;
  }
  updateUser(updatedRecord: User) {
    const index = this.users.findIndex((u) => u.id === updatedRecord.id);
    if (index === -1) {
      throw new NotFoundException(`This user doesn't exist`);
    }
    this.users[index] = updatedRecord;
    return updatedRecord;
  }
  updateEntity<T>(
    collectionType: RepositoryResources,
    index: string,
    updatedRecord: T,
  ) {
    this[collectionType][index] = updatedRecord;
    return updatedRecord;
  }

  removeElement<T extends User & Track & Album & Artist>(
    collectionType: RepositoryResources,
    id: string,
  ) {
    const index = this[collectionType].findIndex((el: T) => el.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `This ${collectionType.slice(0, -1)} doesn't exist`,
      );
    }
    this[collectionType].splice(index, 1);
  }
  removeFavorite(collectionType: keyof Favorites, id: string) {
    this.favorites[collectionType] = this.favorites[collectionType].filter(
      (idx) => idx !== id,
    );
  }
  isEntityExist<T extends User & Track & Album & Artist>(
    collectionType: RepositoryResources,
    id: string,
  ) {
    return this[collectionType].some((el: T) => el.id === id);
  }
  clearArtistReferences(id: string): void {
    this.clearReferencesFromCollection<Track>(this.tracks, 'artistId', id);
    this.clearReferencesFromCollection<Album>(this.albums, 'artistId', id);
  }
  clearAlbumReferences(id: string): void {
    this.clearReferencesFromCollection<Track>(this.tracks, 'albumId', id);
  }
  private clearReferencesFromCollection<T>(
    collection: T[],
    property: keyof T,
    id: string,
  ): void {
    collection.forEach((el) => {
      if (el[property] === id) {
        el[property] = null;
      }
    });
  }
}
