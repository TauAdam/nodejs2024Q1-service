export class Track {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
