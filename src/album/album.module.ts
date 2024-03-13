import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, RepositoryService],
})
export class AlbumModule {}
