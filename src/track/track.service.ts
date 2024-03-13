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
    const isArtistExist = this.repository.artists.find(
      (el) => el.id === createTrackDto.artistId,
    );

    const track = new Track({
      ...createTrackDto,
      id: v4(),
      artistId: isArtistExist ? createTrackDto.artistId : null,
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
    return this.repository.updateTrack(id, updatedRecord);
  }

  remove(id: string) {
    const index = this.repository.tracks.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`This track doesn't exist`);
    }
    this.repository.tracks.splice(index, 1);
    return;
  }
}
