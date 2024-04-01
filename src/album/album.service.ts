import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({ data: createAlbumDto });
    return plainToInstance(Album, album);
  }

  async findAll() {
    return plainToInstance(Album, await this.prisma.album.findMany());
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(`This album doesn't exist`);
    return plainToInstance(Album, album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);
    const updatedRecord = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return plainToInstance(Album, updatedRecord);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.album.delete({ where: { id } });
  }
}
