import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUserEntity } from 'src/chat/model/connected-user/connected-user.entity';
import { ConnectedUserI } from 'src/chat/model/connected-user/connected-user.interface';
import { UserInterface } from 'src/user/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService {

  constructor(
    @InjectRepository(ConnectedUserEntity)
    private readonly connectedUserRepository: Repository<ConnectedUserEntity>
  ) { }

  async create(connectedUser: ConnectedUserI): Promise<ConnectedUserI> {
    return this.connectedUserRepository.save(connectedUser);
  }

  async findByUser(user: UserInterface): Promise<ConnectedUserI[]> {
    return this.connectedUserRepository.find({ user });
  }

  async deleteBySocketId(socketId: string) {
    return this.connectedUserRepository.delete({ socketId });
  }

  async deleteAll() {
    await this.connectedUserRepository
      .createQueryBuilder()
      .delete()
      .execute();
  }

}