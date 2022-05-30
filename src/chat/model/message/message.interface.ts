import { UserInterface } from "src/user/models/user.interface";
import { RoomI } from "../room/room.interface";


export interface MessageI {
  id?: number;
  text: string;
  user: UserInterface;
  room: RoomI;
  created_at: Date;
  updated_at: Date;
}