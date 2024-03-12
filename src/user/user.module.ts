import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryService } from 'src/repository/repository.service';

@Module({
  controllers: [UserController],
  providers: [UserService, RepositoryService],
})
export class UserModule {}
