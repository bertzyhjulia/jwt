import { Body, Controller, Get, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SesssionSerializer } from 'src/auth/strategies/SessionSerializer';
import { CreatePost } from '../model/dto/createPosts.dto';
import { PostsService } from '../service/posts.service';
   
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {} 
     
  //@UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() createDto:CreatePost, @Session() session: Record<string, any>) {
    session.authentificated = true
    return session.passport
    //   const post =  this.postsService.createPost(createDto).then(author =>
    //     console.log(this.getSession(session)))
  }

  @Get()
  findAll(){
      return this.postsService.getAllPosts();
  }

  @UseInterceptors(SesssionSerializer)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  getSession(@Session() session: Record<string, any>) {
    session.authentificated = true
    return session
  }
}
