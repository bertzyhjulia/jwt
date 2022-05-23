import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserEntity } from "src/user/models/user.entity";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class SesssionSerializer extends PassportSerializer {
    constructor(
     private readonly userService:UserService
    ){
        super()
    }

    serializeUser(user: UserEntity, done: (err, user:UserEntity)=>void) {
        done(null, user)
    }

    deserializeUser(user: UserEntity, done: (err, user:UserEntity)=>void) {
        const userDb = this.userService.findOne(user.id)
        return userDb?done(null, user):done(null, null) 
    }
}