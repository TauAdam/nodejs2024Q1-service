import { Exclude } from 'class-transformer';

export class User {
  id: string;
  version: number;

  login: string;
  @Exclude()
  password: string;

  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
