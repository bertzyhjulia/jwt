import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostEntity } from 'src/posts/model/post.entity';
import { SesssionSerializer } from 'src/auth/strategies/SessionSerializer';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PostEntity]),
    AuthModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [UserService, SesssionSerializer, LocalStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
