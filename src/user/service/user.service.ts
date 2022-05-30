import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { EditUserDto } from '../models/dto/EditUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) { }

  create(createdUserDto: CreateUserDto, img:string): Observable<UserI> {
    createdUserDto.avatar = img;
    const userEntity = this.userRepository.create(createdUserDto);
    return this.nickNameExists(userEntity.nickName).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(userEntity.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              userEntity.password = passwordHash;
              
              return from(this.userRepository.save(userEntity)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                })
              )
            })
          )
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      })
    )
  }

  logIn(loginUserDto: LoginUserDto): Observable<string> {
    console.log('loginUserDto    '+ loginUserDto.email)
    console.log('loginUserDto    '+ loginUserDto.nickName)
    console.log('loginUserDto    '+ loginUserDto.password)
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: UserI) => {
        if (user) {
          return this.validatePassword(loginUserDto.password, user.password).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserI) => this.authService.generateJwt(user))
                )
              } else {
                throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);
              }
            })
          )
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      )
    )
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.findUserByEmail(email);
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  findAll(): Observable<UserI[]> {
    return from(this.userRepository.find({relations:['post_id']}));
  }

  findOne(id: number): Observable<UserI> {
    return from(this.userRepository.findOne({ id }));
  }

  findUserByEmail(email: string): Observable<UserI> {
    return from(this.userRepository.findOne({ email }, { select: ['id', 'nickName', 'email', 'name', 'lastName', 'avatar', 'tel', 'date', 'password'] }));
  }

  findByEmail(email: string) {
    const user=  this.userRepository.findOne({email});
    return user
  }

  edit(id:number, edit:EditUserDto, img:string){
    return this.findOne(id).pipe(
      map((user:UserEntity)=> {
        console.log(user)
        user.name = edit.name;
        user.lastName = edit.lastName;
        if(img){
          user.avatar = img
          return this.userRepository.save(user)
        }
        return this.userRepository.save(user)
        }
      )
    )
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  private validatePassword(password: string, storedPasswordHash: string): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private nickNameExists(nickName: string): Observable<boolean> {
    nickName = nickName.toLowerCase();
    console.log(nickName)
    return from(this.userRepository.findOne({ nickName })).pipe( 
      map((user: UserI) => {
    console.log(user)   
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  public getOne(id: number): Promise<UserI> {
    return this.userRepository.findOneOrFail({ id });
  }

}
