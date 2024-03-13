import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, RepositoryService],
})
export class TrackModule {}
