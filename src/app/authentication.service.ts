import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccessTokenModel} from './access-token.model';
import {BaseUrl} from './BaseUrl.enum';
import {UserDetailsModel} from './user-details.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  accessToken: AccessTokenModel;
  userDetails: UserDetailsModel;

  constructor(private http: HttpClient) { }

  getAndSetAccessToken(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic dGVzdDprb2JpbmVz'})
    };

    const body = 'username=' + username
      + '&password=' + password
      + '&grant_type=' + 'password';

    this.http.post<AccessTokenModel>(
      BaseUrl.BASEURL + '/oauth/token',
      body,
      httpOptions
    ).subscribe((data: AccessTokenModel) => {
      console.log(data);
      this.accessToken = data;
      localStorage.setItem('accessToken', JSON.stringify(this.accessToken));

      this.authenticate();
    }, error => console.log(error));

  }

  authenticate() {
    const bearerToken = this.accessToken.token_type + ' ' + this.accessToken.access_token;

    const httpOptions = {
      headers: new HttpHeaders({'Authorization': bearerToken})
    };

    this.http.get<UserDetailsModel>(
      BaseUrl.BASEURL + '/api/v1/user/authenticate',
      httpOptions
    ).subscribe((data: UserDetailsModel) => {
      localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
      this.userDetails = data;
    });
  }
}