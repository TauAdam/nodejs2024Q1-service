export class Favorites {
  tracks: string[] = [];
  artists: string[] = [];
  albums: string[] = [];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}
