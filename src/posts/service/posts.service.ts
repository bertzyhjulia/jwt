import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePost } from '../model/dto/createPosts.dto';
import { UpdatePost } from '../model/dto/updatePost.dto';
import { PostEntity } from '../model/post.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
      ) { }

    async createPost(createDto: CreatePost){
        const post = this.postRepository.create(createDto);
        return this.postRepository.save(post);
    }

    async updatePost(id:number, post: UpdatePost){
        return await this.postRepository.findOne(id, {relations:['author_id']}).then(
           res => {
               res.title = post.title;
               res.description = post.description;
               return  this.postRepository.save(res);
           } 
        )
    }
    
    async getOnePost(id: number) {
        return this.postRepository.findOne(id, {relations:['author_id']})
    }

    async getAllPosts(){
        return this.postRepository.find({relations:['author_id']})
    }

    async deletePost(id:number){
        return await this.postRepository.findOne(id).then(
            res => {
                return this.postRepository.delete(res)
            }
        )
    }
  
}
