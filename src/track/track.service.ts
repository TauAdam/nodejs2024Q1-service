import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { Track } from 'src/track/entities/track.entity';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly repository: RepositoryService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = new Track({
      ...createTrackDto,
      id: v4(),
      albumId: this.repository.getAlbumId(createTrackDto.albumId),
      artistId: this.repository.getArtistId(createTrackDto.artistId),
    });
    this.repository.tracks.push(track);
    return track;
  }

  findAll() {
    return this.repository.tracks;
  }

  findOne(id: string) {
    const record = this.repository.tracks.find((el) => el.id === id);
    if (!record) throw new NotFoundException(`This track doesn't exist`);
    return record;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const record = this.findOne(id);
    const updatedRecord = new Track({
      ...record,
      ...updateTrackDto,
    });
    return this.repository.updateEntity('tracks', id, updatedRecord);
  }

  remove(id: string) {
    this.repository.removeElement('tracks', id);
    this.repository.favorites.remove('tracks', id);
  }
}
