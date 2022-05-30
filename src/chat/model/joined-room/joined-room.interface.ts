import { UserInterface } from "src/user/models/user.interface";
import { RoomI } from "../room/room.interface";


export interface JoinedRoomI {
  id?: number;
  socketId: string;
  user: UserInterface;
  room: RoomI;
}