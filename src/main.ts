import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport'
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const RedisStore = createRedisStore(session)
  const redisClient = createClient({
    url: 'redis://localhost:6379',
  })
 
  app.use(
    session({
      name: 'USER_SESSION',
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge: 90000000000000000000000,
      },
      store: new RedisStore({ client: redisClient }),
    }),
  );
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
