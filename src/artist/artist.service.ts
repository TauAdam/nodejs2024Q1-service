import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly repository: RepositoryService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist({ ...createArtistDto, id: v4() });
    this.repository.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.repository.artists;
  }

  findOne(id: string) {
    const record = this.repository.artists.find((el) => el.id === id);
    if (!record) throw new NotFoundException(`This artist doesn't exist`);
    return record;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const record = this.findOne(id);
    const updatedRecord = new Artist({
      ...record,
      ...updateArtistDto,
    });
    return this.repository.updateArtist(id, updatedRecord);
  }

  remove(id: string) {
    const index = this.repository.artists.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`This artist doesn't exist`);
    }
    this.repository.artists.splice(index, 1);
    this.repository.tracks.forEach((el) => {
      if (el.artistId === id) {
        el.artistId = null;
      }
    });
    this.repository.albums.forEach((el) => {
      if (el.artistId === id) {
        el.artistId = null;
      }
    });
    return;
  }
}
