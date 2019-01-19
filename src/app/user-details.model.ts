import {UserModel} from './user.model';
import {AuthorityModel} from './authority.model';

export interface UserDetailsModel {
  user: UserModel;
  authorities: AuthorityModel[];
}
