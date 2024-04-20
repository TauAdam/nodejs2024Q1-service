import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites {
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
