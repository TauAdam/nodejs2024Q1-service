import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: dto });
    return plainToInstance(User, user);
  }

  async findAll() {
    return plainToInstance(User, await this.prisma.user.findMany());
  }
  async getOne(id: string) {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`This user doesn't exist`);
    return record;
  }
  async findOne(id: string) {
    return plainToInstance(User, await this.getOne(id));
  }
  async findByLogin(login: string) {
    const record = await this.prisma.user.findFirst({ where: { login } });
    return plainToInstance(User, record);
  }

  async update(id: string, { newPassword, oldPassword }: UpdateUserDto) {
    const record = await this.getOne(id);
    if (record.password !== oldPassword)
      throw new ForbiddenException('Wrong password');
    const updatedRecord = await this.prisma.user.update({
      where: { id },
      data: { password: newPassword, version: { increment: 1 } },
    });
    return plainToInstance(User, updatedRecord);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
