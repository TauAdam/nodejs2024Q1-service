import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Tokens } from 'src/auth/entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly SALT = this.configService.get<string>('CRYPT_SALT', '10');

  async signup({ password, login }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, +this.SALT);
    return await this.userService.create({ login, password: hashedPassword });
  }
  async login({ password, login }: CreateUserDto) {
    const user = await this.userService.findByLogin(login);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      throw new ForbiddenException('Invalid login or password');
    }
    const payload = { login, userId: user.id };
    return await this.generateJwt(payload);
  }

  private async generateJwt(payload: JwtPayload): Promise<Tokens> {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
        expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }
  // private async generateJwt(payload: JwtPayload): Promise<Tokens> {
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //     refreshToken: this.jwtService.sign(payload),
  //   };
  // }
}
