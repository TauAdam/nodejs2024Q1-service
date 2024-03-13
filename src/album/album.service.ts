import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { Album } from 'src/album/entities/album.entity';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly repository: RepositoryService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album({ ...createAlbumDto, id: v4() });
    this.repository.albums.push(album);
    return album;
  }

  findAll() {
    return this.repository.albums;
  }

  findOne(id: string) {
    const record = this.repository.albums.find((el) => el.id === id);
    if (!record) throw new NotFoundException(`This album doesn't exist`);
    return record;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const record = this.findOne(id);
    const updatedRecord = new Album({
      ...record,
      ...updateAlbumDto,
    });
    return this.repository.updateAlbum(id, updatedRecord);
  }

  remove(id: string) {
    const index = this.repository.albums.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`This album doesn't exist`);
    }
    this.repository.albums.splice(index, 1);
    return;
  }
}
