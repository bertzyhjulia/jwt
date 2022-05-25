import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLike } from '../model/dto/crealeLike.dto';
import { LikesEntity } from '../model/likes.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(LikesEntity)
        private likesRepository: Repository<LikesEntity>,
      ) { }

      async deleteLike(CreateLike:CreateLike){
        const user = CreateLike.user_id;
        const post = CreateLike.post_id;
        const like = await this.likesRepository.findOne({where:[{user_id: user, post_id: post}]})
        return this.likesRepository.delete(like) 
      }

      async createLike(CreateLike:CreateLike){
        const user = CreateLike.user_id;
        const post = CreateLike.post_id;
        const like = await this.likesRepository.find({where:[{user_id: user, post_id: post}]})
        console.log('like.length  '+like.length)
        if(!like.length){
          console.log('create Like')
          const like = await this.likesRepository.create(CreateLike)
          return await this.likesRepository.save(like);
        }
        console.log('dizlike')
        return await this.deleteLike(CreateLike)
    }

}
