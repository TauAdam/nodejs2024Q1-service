import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RepositoryService {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];

  updateUser(updatedRecord: User) {
    const index = this.users.findIndex((u) => u.id === updatedRecord.id);
    if (index === -1) {
      throw new NotFoundException(`This user doesn't exist`);
    }
    this.users[index] = updatedRecord;
    return updatedRecord;
  }
  updateEntity<T>(
    collectionType: 'users' | 'tracks' | 'artists' | 'albums',
    index: string,
    updatedRecord: T,
  ) {
    this[collectionType][index] = updatedRecord;
    return updatedRecord;
  }

  removeElement<T extends User & Track & Album & Artist>(
    collectionType: 'users' | 'tracks' | 'artists' | 'albums',
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
  isEntityExist<T extends User & Track & Album & Artist>(
    collectionType: 'users' | 'tracks' | 'artists' | 'albums',
    id: string,
  ) {
    return this[collectionType].some((el: T) => el.id === id);
  }
  clearArtistReferences(id: string): void {
    this.clearReferencesFromCollection<Track>(this.tracks, 'artistId', id);
    this.clearReferencesFromCollection<Album>(this.albums, 'artistId', id);
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
