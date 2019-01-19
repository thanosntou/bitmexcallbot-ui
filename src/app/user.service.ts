import {UserModel} from './user.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccessTokenModel} from './access-token.model';
import {BaseUrl} from './BaseUrl.enum';

@Injectable()
export class UserService {
  loggedUser: UserModel;


  constructor(private http: HttpClient) {
  }

  authenticate(token: AccessTokenModel) {
    // const accessToken = (<AccessTokenModel>token);
    const bearerToken = token.token_type + ' ' + token.access_token;

    const httpOptions = {
      headers: new HttpHeaders({'Authorization': bearerToken})
    };

    this.http.get<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/authenticate',
      httpOptions
    ).subscribe((data: UserModel) => {
      this.loggedUser = data;
      localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
