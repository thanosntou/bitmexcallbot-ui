import {FollowerModel} from './followers-panel/follower.model';

export class LoginModel {
  id: number;
  user: FollowerModel;
  create_date: string;

  constructor(id: number, create_date: string) {
    this.id = id;
    this.create_date = create_date;
  }
}
