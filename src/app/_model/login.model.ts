import {UserModel} from './user.model';

export class LoginModel {
  id: number;
  user: UserModel;
  create_date: string;

  constructor(id: number, create_date: string) {
    this.id = id;
    this.create_date = create_date;
  }
}
