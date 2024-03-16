export type FavoritesCategory = Pick<
  Favorites,
  'tracks' | 'artists' | 'albums'
>;

export class Favorites {
  tracks: string[] = [];
  artists: string[] = [];
  albums: string[] = [];

  add(collectionType: keyof FavoritesCategory, id: string) {
    this[collectionType].push(id);
  }
  remove(collectionType: keyof FavoritesCategory, id: string) {
    this[collectionType] = this[collectionType].filter((el) => el !== id);
  }
  has(collectionType: keyof FavoritesCategory, id: string) {
    return this[collectionType].includes(id);
  }
}
