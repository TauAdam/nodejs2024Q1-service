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
    return this.repository.updateEntity('albums', id, updatedRecord);
  }

  remove(id: string) {
    this.repository.removeElement('albums', id);
    this.repository.favorites.remove('albums', id);
    this.repository.clearAlbumReferences(id);
  }
}