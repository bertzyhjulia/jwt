import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { RoomService } from './service/room/room.service';
import { MessageService } from './service/message/message.service';
import { JoinedRoomService } from './service/joined-room/joined-room.service';
import { ConnectedUserService } from './service/connected-user/connected-user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './model/room/room.entity';
import { ConnectedUserEntity } from './model/connected-user/connected-user.entity';
import { MessageEntity } from './model/message/message.entity';
import { JoinedRoomEntity } from './model/joined-room/joined-room.entity';

@Module({
  imports: [AuthModule, UserModule,
    TypeOrmModule.forFeature([
      RoomEntity,
      ConnectedUserEntity,
      MessageEntity,
      JoinedRoomEntity
    ])
  ],
  providers: [ChatGateway, RoomService, MessageService, JoinedRoomService, ConnectedUserService]
})
export class ChatModule {}
