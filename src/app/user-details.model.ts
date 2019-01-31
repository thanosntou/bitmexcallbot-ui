import {AuthorityModel} from './authority.model';
import {UserModel} from './user.model';

export class UserDetailsModel {
  user: UserModel;
  authorities: AuthorityModel[];
}
