import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, RepositoryService],
})
export class FavoritesModule {}
