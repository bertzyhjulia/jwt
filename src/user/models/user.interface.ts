export interface UserI {
    id: number;
    name: string;
    lastName:string;
    tel:number;
    date:Date;
    avatar:string
    email: string;
    nickName:string;
    password?: string;
}

export interface UserInterface {
    id?: number;
    username?: string;
    email: string;
    password?: string;
  }