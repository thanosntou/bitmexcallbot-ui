import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccessTokenModel} from './access-token.model';
import {BaseUrl} from './BaseUrl.enum';
import {UserDetailsModel} from './user-details.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  accessToken: AccessTokenModel;
  bearerToken: string;
  userDetails: UserDetailsModel;

  constructor(private http: HttpClient, private router: Router) {
    const at = localStorage.getItem('accessToken');
    if (at !== null) {
      this.accessToken = <AccessTokenModel> JSON.parse(localStorage.getItem('accessToken'));
      localStorage.setItem('accessToken', JSON.stringify(this.accessToken));
      this.authenticate();
    }
  }

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
      this.bearerToken = data.token_type + ' ' + data.access_token;
      localStorage.setItem('accessToken', JSON.stringify(this.accessToken));

      this.authenticate();

      this.router.navigate(['/trade']);

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
