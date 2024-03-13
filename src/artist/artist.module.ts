import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, RepositoryService],
})
export class ArtistModule {}
