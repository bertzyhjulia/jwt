import { Post } from "src/posts/model/post.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nickName: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
  @Column()
  lastName: string;

  @Column()
  tel: number;

  @Column('date', { nullable: true })
  date: Date;

  @Column()
  avatar: string;

  @OneToMany(() => Post, posts => posts.id)
  posts: Post[];
}