import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikesEntity } from '../model/likes.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(LikesEntity)
        private likesRepository: Repository<LikesEntity>,
      ) { }


}
