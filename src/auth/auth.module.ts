import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { options } from 'src/auth/config';

@Module({
  imports: [UserModule, JwtModule.registerAsync(options())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
