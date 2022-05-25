import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostEntity } from 'src/posts/model/post.entity';
import { CreateLike } from '../model/dto/crealeLike.dto';
import { LikesService } from '../service/likes.service';

@Controller('likes')
export class LikesController {
    constructor(private likesService: LikesService) {} 

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createComment(@Body() createLike:CreateLike, @Request() req){
        createLike.user_id = req.user.id
        return await this.likesService.createLike(createLike)
    }
}
