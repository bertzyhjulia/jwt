import { PostEntity } from "src/posts/model/post.entity";
import { UserEntity } from "src/user/models/user.entity";

export class CreateLike {
    post_id: PostEntity;
    user_id: UserEntity;
}