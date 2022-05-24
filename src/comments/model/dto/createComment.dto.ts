import { PostEntity } from "src/posts/model/post.entity";
import { UserEntity } from "src/user/models/user.entity";

export class CreateComment {
    comment: string = '';
    post_id: PostEntity;
    author_id: UserEntity
}