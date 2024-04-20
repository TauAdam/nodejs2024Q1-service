import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload, decode } from 'jsonwebtoken';
import { CreateRefreshDto } from 'src/auth/dto/create-refresh.dto';
import { Tokens } from 'src/auth/entity/auth.entity';
import { EnvService } from 'src/env/env.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly SALT = this.envService.get('CRYPT_SALT');

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
        secret: this.envService.get('JWT_SECRET_KEY'),
        expiresIn: this.envService.get('TOKEN_EXPIRE_TIME'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.envService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.envService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }

  async refresh({ refreshToken }: CreateRefreshDto) {
    if (!refreshToken) throw new UnauthorizedException('No token provided');

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.envService.get('JWT_SECRET_REFRESH_KEY'),
      });
    } catch (e) {
      throw new ForbiddenException('Invalid token');
    }
    const { userId, login } = decode(refreshToken) as JwtPayload;
    return await this.generateJwt({ userId, login });
  }
}
