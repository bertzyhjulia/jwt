import { Controller } from '@nestjs/common';
import { LikesService } from '../service/likes.service';

@Controller('likes')
export class LikesController {
    constructor(private likesService: LikesService) {} 
}
