import {TokenModel} from './_model/token.model';
import {UserDetailsModel} from './_model/user-details.model';

export class UserConnectionModel {
  token: TokenModel;
  userDetails: UserDetailsModel;

  constructor(token: TokenModel, userDetails: UserDetailsModel) {
    this.token = token;
    this.userDetails = userDetails;
  }
}
