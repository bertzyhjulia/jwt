import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePost } from '../model/dto/createPosts.dto';
import { UpdatePost } from '../model/dto/updatePost.dto';
import { PostsService } from '../service/posts.service';
   
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {} 
     
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(@Body() posts:CreatePost, @Request() req) {
    posts.author_id = req.user.id;
    return this.postsService.createPost(posts)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getOne/:id')
  async getOne(@Param() id:number){
    return this.postsService.getOnePost(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:id')
  editPost(@Param() id:number, @Body() posts: UpdatePost) {
    return this.postsService.updatePost(id, posts)
  }

  @Get()
  findAll(){
      return this.postsService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deletePost(@Param() id:number){
    return this.postsService.deletePost(id)
  }

}
