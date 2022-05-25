import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostEntity } from 'src/posts/model/post.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UserEntity } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { LikesController } from './controller/likes.controller';
import { LikesEntity } from './model/likes.entity';
import { LikesService } from './service/likes.service';


@Module({
  imports: [
      TypeOrmModule.forFeature([PostEntity, UserEntity, LikesEntity]),
      AuthModule,
    ], 
  providers: [LikesService],
  controllers: [LikesController]
})
export class LikesModule {}
