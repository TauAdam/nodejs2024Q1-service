import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class FavoritesService {
  private readonly TABLE_ID = 1;
  constructor(private readonly prisma: PrismaService) {}

  async addTrack(id: string) {
    const record = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!record) {
      throw new UnprocessableEntityException('This track does not exist.');
    }
    await this.prisma.track.update({
      where: { id },
      data: {
        favorite: {
          connectOrCreate: {
            create: { id: this.TABLE_ID },
            where: { id: this.TABLE_ID },
          },
        },
      },
    });
    return 'Track added to favorites';
  }
  async addAlbum(id: string) {
    const record = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!record) {
      throw new UnprocessableEntityException('This album does not exist.');
    }
    await this.prisma.album.update({
      where: { id },
      data: {
        favorite: {
          connectOrCreate: {
            where: { id: this.TABLE_ID },
            create: { id: this.TABLE_ID },
          },
        },
      },
    });
    return 'Album added to favorites';
  }
  async addArtist(id: string) {
    const record = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!record) {
      throw new UnprocessableEntityException('This artist does not exist.');
    }
    await this.prisma.artist.update({
      where: { id },
      data: {
        favorite: {
          connectOrCreate: {
            where: { id: this.TABLE_ID },
            create: { id: this.TABLE_ID },
          },
        },
      },
    });
    return 'Artist added to favorites';
  }
  async findAll() {
    const records = await this.prisma.favorites.findFirst({
      select: { albums: true, tracks: true, artists: true },
    });
    return plainToInstance(Favorites, records);
  }

  async removeTrack(id: string) {
    const { tracks } = await this.prisma.favorites.findFirst({
      select: { tracks: { where: { id } } },
    });
    if (!tracks.length) {
      throw new NotFoundException('This track is not favorite');
    }
    await this.prisma.track.update({
      where: { id },
      data: {
        favorite: {
          disconnect: { id: this.TABLE_ID },
        },
      },
    });
  }
  async removeAlbum(id: string) {
    const { albums } = await this.prisma.favorites.findFirst({
      select: { albums: { where: { id } } },
    });
    if (!albums.length) {
      throw new NotFoundException('This album is not favorite');
    }
    await this.prisma.album.update({
      where: { id },
      data: {
        favorite: {
          disconnect: { id: this.TABLE_ID },
        },
      },
    });
  }
  async removeArtist(id: string) {
    const { artists } = await this.prisma.favorites.findFirst({
      select: { artists: { where: { id } } },
    });
    if (!artists.length) {
      throw new NotFoundException('This artist is not favorite');
    }
    await this.prisma.artist.update({
      where: { id },
      data: {
        favorite: {
          disconnect: { id: this.TABLE_ID },
        },
      },
    });
  }
}
