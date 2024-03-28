import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  version: number;

  login: string;
  @Exclude()
  password: string;
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
