import { PostEntity } from "src/posts/model/post.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikesEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.id)
    user_id: UserEntity;

    @ManyToOne(() => PostEntity, post => post.id)
    post_id: PostEntity;

}