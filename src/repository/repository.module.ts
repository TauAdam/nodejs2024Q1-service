import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { RepositoryService } from 'src/repository/repository.service';

@Global()
@Module({
  providers: [RepositoryService, PrismaService],
  exports: [RepositoryService, PrismaService],
})
export class RepositoryModule {}
