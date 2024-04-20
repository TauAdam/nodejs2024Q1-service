import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingMiddleware } from 'src/logging/logging.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggingModule } from './logging/logging.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './env/env.module';
import { envSchema } from 'src/env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    LoggingModule,
    AuthModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
