import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RepositoryService {
  public users: User[] = [];
  public tracks: Track[] = [];
  updateUser(updatedRecord: User) {
    const index = this.users.findIndex((u) => u.id === updatedRecord.id);
    if (index === -1) {
      throw new NotFoundException(`This user doesn't exist`);
    }
    this.users[index] = updatedRecord;
    return updatedRecord;
  }
  updateTrack(updatedRecord: Track) {
    const index = this.tracks.findIndex((el) => el.id === updatedRecord.id);
    if (index === -1) {
      throw new NotFoundException(`This track doesn't exist`);
    }
    this.tracks[index] = updatedRecord;
    return updatedRecord;
  }
}
