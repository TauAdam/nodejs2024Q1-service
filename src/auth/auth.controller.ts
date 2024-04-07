import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Tokens } from 'src/auth/entity/auth.entity';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.login(dto);
  }
  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.signup(dto);
  }
}
