import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { PostEntity } from "src/posts/model/post.entity";
import { UserEntity } from "src/user/models/user.entity";
import { CommentsController } from "./comments-controller/comments-controller.controller";
import { CommentsService } from "./comments-service/comments-service.service";
import { CommentsEntity } from "./model/comments.entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([CommentsEntity, PostEntity, UserEntity]),
      AuthModule,
    ],
    providers: [CommentsService],
    controllers: [CommentsController]
  })
  export class CommentsModule {}
