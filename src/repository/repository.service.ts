import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RepositoryService {
  public users: User[] = [];
}
