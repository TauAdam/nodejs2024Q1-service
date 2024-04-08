import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRefreshDto } from 'src/auth/dto/create-refresh.dto';
import { Tokens } from 'src/auth/entity/auth.entity';
import { Public } from 'src/auth/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.login(dto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.signup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
      }),
    )
    dto: CreateRefreshDto,
  ): Promise<Tokens> {
    return await this.authService.refresh(dto);
  }
}
