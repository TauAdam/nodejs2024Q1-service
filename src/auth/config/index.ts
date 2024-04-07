import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get('JWT_SECRET_KEY'),
    signOptions: { expiresIn: config.get('TOKEN_EXPIRE_TIME') },
  }),
});
