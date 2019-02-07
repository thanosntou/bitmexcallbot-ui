import {TokenModel} from './token.model';
import {UserDetailsModel} from './user-details.model';

export class UserConnectionModel {
  token: TokenModel;
  userDetails: UserDetailsModel;

  constructor(token: TokenModel, userDetails: UserDetailsModel) {
    this.token = token;
    this.userDetails = userDetails;
  }
}
