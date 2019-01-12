import {FollowerModel} from '../followers-panel/follower.model';

export interface LoginModel {
  id: number;
  user: FollowerModel;
  create_date: string;
}
