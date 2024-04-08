import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Tokens } from 'src/auth/entity/auth.entity';
import { User } from 'src/user/entities/user.entity';
import { Public } from 'src/auth/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.login(dto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.signup(dto);
  }
}
