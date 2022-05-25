import { CommentsEntity } from "src/comments/model/comments.entity";
import { LikesEntity } from "src/likes/model/likes.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, user => user.id)
  author_id: UserEntity;

  @OneToMany(() => CommentsEntity, comments => comments.id)
  comments_id: CommentsEntity[];

  @OneToMany(() => LikesEntity, likes => likes.id)
  likes_id: LikesEntity[];

}