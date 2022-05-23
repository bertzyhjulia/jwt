import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { from, Observable } from 'rxjs';
import { LoginUserDto } from 'src/user/models/dto/LoginUser.dto';
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email'
    });
  };
  async validate(loginDto:LoginUserDto): Promise<Observable<Object>> {
    return from(this.userService.logIn(loginDto));
  }
}