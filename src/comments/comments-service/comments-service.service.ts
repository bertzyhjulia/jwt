import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../model/comments.entity';
import { CreateComment } from '../model/dto/createComment.dto';
import { UpdateComment } from '../model/dto/updateComment.dto';

@Injectable()
export class CommentsService {
    constructor( @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>){}

    async createComment(createComments:CreateComment){
        const comment = await this.commentsRepository.create(createComments)
        return await this.commentsRepository.save(comment);
    }

    async updateComment(id:number, updateComments:UpdateComment){
        return await this.commentsRepository.findOne(id).then(
            res => {
                res.comment = updateComments.comment;
                 return  this.commentsRepository.save(res);  
            }
        )
    }

    async deleteComment(id:number){
        return await this.commentsRepository.findOne(id).then(
            res => {
                 return  this.commentsRepository.delete(res);  
            }
        )
    }

    async get(){
        return this.commentsRepository.find({relations:['author_id', 'post_id']})
    }

}
