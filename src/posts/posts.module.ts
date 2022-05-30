import { Module } from '@nestjs/common';
import { PostsService } from './service/posts.service';
import { PostsController } from './controller/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './model/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/models/user.entity';
import { SesssionSerializer } from 'src/auth/strategies/SessionSerializer';
import { UserModule } from 'src/user/user.module';
import { CommentsEntity } from 'src/comments/model/comments.entity';
import { LikesEntity } from 'src/likes/model/likes.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, CommentsEntity, LikesEntity]),
    AuthModule,
    UserModule,
    CommentsModule,
    LikesModule
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
