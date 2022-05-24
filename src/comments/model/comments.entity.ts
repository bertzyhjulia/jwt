import { PostEntity } from "src/posts/model/post.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentsEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    comment:string;

    @ManyToOne(() => UserEntity, user => user.id)
    author_id: UserEntity;

    @ManyToOne(() => PostEntity, post => post.id)
    post_id: PostEntity;

}