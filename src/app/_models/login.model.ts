import {UserModel} from './user.model';

export interface LoginModel {
  id: number;
  user: UserModel;
  createdOn: string;
}
