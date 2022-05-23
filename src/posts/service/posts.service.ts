import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { CreatePost } from '../model/dto/createPosts.dto';
import { Post } from '../model/post.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
      ) { }

    async createPost(createDto: CreatePost){
        return this.postRepository.create(createDto);
    }

    private async savePost(post: Post) {
        return this.postRepository.save(post);
    }

    async getAllPosts(){
        return this.postRepository.find({relations:['author']})
    }

    // async getAllOwnPosts(){
    //     return this.userRepository.find({
    //         select: ['author'],
    //         where: {
    //             author: 'completed',
    //         },
    //         relations: ['author'],
    //       })
    // }



    
}
