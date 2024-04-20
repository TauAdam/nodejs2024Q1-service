import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [RepositoryModule],
})
export class FavoritesModule {}
