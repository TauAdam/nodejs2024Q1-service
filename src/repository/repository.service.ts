import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RepositoryService {
  public users: User[] = [];
  update(updatedRecord: User) {
    const index = this.users.findIndex((u) => u.id === updatedRecord.id);
    if (index === -1) {
      throw new NotFoundException(
        `User with ${updatedRecord.id} doesn't exist`,
      );
    }
    this.users[index] = updatedRecord;
    return updatedRecord;
  }
}
