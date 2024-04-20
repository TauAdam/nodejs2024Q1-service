import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Artist } from 'src/artist/entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({ data: createArtistDto });
    return plainToInstance(Artist, artist);
  }

  async findAll() {
    return plainToInstance(Artist, await this.prisma.artist.findMany());
  }

  async findOne(id: string) {
    const record = await this.prisma.artist.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`This artist doesn't exist`);
    return plainToInstance(Artist, record);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id);
    const updatedRecord = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    return plainToInstance(Artist, updatedRecord);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.artist.delete({ where: { id } });
  }
}
