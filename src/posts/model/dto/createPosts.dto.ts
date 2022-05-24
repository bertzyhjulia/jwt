import { UserEntity } from "src/user/models/user.entity";

export class CreatePost {
    title: string;
    description: string;
    author_id: UserEntity
}