import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { v4 } from 'uuid';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: RepositoryService) {}
  create({ login, password }: CreateUserDto) {
    const user = new User({
      login,
      password,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.repository.users.push(user);
    return user;
  }

  findAll() {
    return this.repository.users;
  }

  findOne(id: string) {
    const record = this.repository.users.find((user) => user.id === id);
    if (!record) throw new NotFoundException(`This user doesn't exist`);
    return record;
  }

  update(id: string, { newPassword, oldPassword }: UpdateUserDto) {
    const record = this.findOne(id);
    if (record.password !== oldPassword)
      throw new ForbiddenException('old password is wrong');
    const updatedRecord = new User({
      ...record,
      version: record.version + 1,
      updatedAt: Date.now(),
      password: newPassword,
    });
    return this.repository.updateUser(updatedRecord);
  }

  remove(id: string) {
    this.repository.removeElement('users', id);
  }
}
