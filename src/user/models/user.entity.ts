import { ConnectedUserEntity } from "src/chat/model/connected-user/connected-user.entity";
import { JoinedRoomEntity } from "src/chat/model/joined-room/joined-room.entity";
import { MessageEntity } from "src/chat/model/message/message.entity";
import { RoomEntity } from "src/chat/model/room/room.entity";
import { CommentsEntity } from "src/comments/model/comments.entity";
import { LikesEntity } from "src/likes/model/likes.entity";
import { PostEntity } from "src/posts/model/post.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => PostEntity, posts => posts.id)
  posts: PostEntity[];

  @OneToMany(() => CommentsEntity, comments => comments.id)
  comments: CommentsEntity[];

  @OneToMany(() => LikesEntity, likes => likes.id)
  likes_id: LikesEntity[];

  @ManyToMany(() => RoomEntity, room => room.users)
  rooms: RoomEntity[]

  @OneToMany(() => ConnectedUserEntity, connection => connection.user)
  connections: ConnectedUserEntity[];

  @OneToMany(() => JoinedRoomEntity, joinedRoom => joinedRoom.room)
  joinedRooms: JoinedRoomEntity[];

  @OneToMany(() => MessageEntity, message => message.user)
  messages: MessageEntity[];
}