import { IsString } from "class-validator";
import { LoginUserDto } from "./LoginUser.dto";


export class EditUserDto {

    @IsString()
    name: string;
    lastName: string;
    avatar:string; 
}