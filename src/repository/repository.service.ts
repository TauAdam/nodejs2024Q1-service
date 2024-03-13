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
  updateTrack(index: string, updatedRecord: Track) {
    this.tracks[index] = updatedRecord;
    return updatedRecord;
  }
  updateArtist(index: string, updatedRecord: Artist) {
    this.artists[index] = updatedRecord;
    return updatedRecord;
  }
  updateAlbum(index: string, updatedRecord: Album) {
    this.albums[index] = updatedRecord;
    return updatedRecord;
  }
}
