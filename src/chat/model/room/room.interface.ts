import { UserInterface } from "src/user/models/user.interface";

export interface RoomI {
  id?: number;
  name?: string;
  description?: string;
  users?: UserInterface[];
  created_at?: Date;
  updated_at?: Date;
}