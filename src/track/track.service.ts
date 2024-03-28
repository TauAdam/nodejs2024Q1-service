import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/repository/prisma.service';
import { Track } from 'src/track/entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.create({ data: createTrackDto });
    return plainToInstance(Track, track);
  }

  async findAll() {
    return plainToInstance(Track, await this.prisma.track.findMany());
  }

  async findOne(id: string) {
    const record = await this.prisma.track.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`This track doesn't exist`);
    return plainToInstance(Track, record);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);
    const updatedRecord = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return plainToInstance(Track, updatedRecord);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.track.delete({ where: { id } });
  }
}
