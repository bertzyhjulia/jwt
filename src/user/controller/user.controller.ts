import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SesssionSerializer } from 'src/auth/strategies/SessionSerializer';
import { LogInWithCredentialsGuard } from 'src/auth/guards/LogInWithCredentialsGuard.guarg';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';
import { EditUserDto } from '../models/dto/EditUser.dto';
import { join } from 'path';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';


export const storage = {
  storage: diskStorage({
    destination: 'dist/uploads/profileimagies',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
@UseInterceptors(SesssionSerializer)
export class UserController {
  constructor(private userService: UserService) { }

  // Rest Call: POST http://localhost:3000/api/users/
  @Post('clientAdd')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async uploadFile(
    @Body() createDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ){
    const img = avatar.filename;
    return await this.userService.create(createDto, img);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: LoginUserDto) {
    return this.userService.logIn(req).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000
        }
      })
    );
  }

  // Rest Call: POST http://localhost:8080/api/users/login
  // @UseGuards(LogInWithCredentialsGuard)
  // @Post('login')
  // @HttpCode(200)
  //  logIin(@Body() loginUserDto: LoginUserDto, @Req() req): Observable<Object> {
  //   console.log(loginUserDto)
  //   // const user = this.userService.findByEmail(loginUserDto.email);
    
  //   // const user = this.userService.findByEmail(loginUserDto.email).then(result =>
  //   //   req.session.passport.user.source = result 
  //   //   );
  //   // console.log(user)
  //   // console.log('user')
  
  //   return this.userService.logIn(loginUserDto).pipe(
  //     map((jwt: string) => {
  //       return {
  //         access_token: jwt,
  //         token_type: 'JWT',
  //         expires_in: 10000
  //       }
  //     })
  //   );
  // }

  // @UseGuards(CookieAuthenticationGuard)
  // @Get()
  // getSession(@Session() session: Record<string, any>) {
  //   session.authentificated = true
  //   return session.passport.user.source
  // }

  // @UseGuards(CookieAuthenticationGuard)
  // @Get('/profile')
  // getProfile(@Session() session: Record<string, any>) {
  //   return session.passport
  // }

  // Rest Call: GET http://localhost:8080/api/users/ 
  // Requires Valid JWT from Login Request
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findAll(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteUser:id')
  async deleteClient(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateUser/:id')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async editWithAvatar(
    @Param('id') id: number,
    @Body() editDto: EditUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ){
    let img = '';
    if(avatar){
       img = avatar.filename;
    }
    return this.userService.edit(id, editDto, img)
  }

  @Get('profileimagies/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), 'dist/uploads/profileimagies/' + imagename),
      ),
    );
  }
}
