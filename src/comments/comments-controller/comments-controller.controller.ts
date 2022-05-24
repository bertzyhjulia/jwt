import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentsService } from '../comments-service/comments-service.service';
import { CommentsEntity } from '../model/comments.entity';
import { CreateComment } from '../model/dto/createComment.dto';
import { UpdateComment } from '../model/dto/updateComment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {} 

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createComment(@Body() createComment:CreateComment, @Request() req){
        createComment.author_id = req.user.id
        return await this.commentsService.createComment(createComment)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/edit/:id')
    async updateComment(@Param() id: number, @Body() updateComment:UpdateComment){
        return await this.commentsService.updateComment(id, updateComment)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async deleteComment(@Param() id: number){
        return await this.commentsService.deleteComment(id)
    }

    @Get()
    async get(){
        return this.commentsService.get()
    }



}
