import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class RepositoryModule {}
