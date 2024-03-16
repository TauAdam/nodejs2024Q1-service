import { Global, Module } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';

@Global()
@Module({
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
