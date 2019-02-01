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
  userDetails: UserDetailsModel;
  isAdmin: boolean;
  isTrader: boolean;
  isCustomer: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  findToken() {
    const accessToken = <AccessTokenModel> JSON.parse(localStorage.getItem('accessToken'));
    if (!accessToken) {
      this.userDetails = null;
      this.router.navigate(['/']);
    }
    return accessToken.token_type + ' ' + accessToken.access_token;
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
      BaseUrl.BASEURL + '/oauth/token', body, httpOptions
    ).subscribe((data: AccessTokenModel) => {
      localStorage.setItem('accessToken', JSON.stringify(data));
      this.authenticate();
      this.router.navigate(['/trade']);
    }, error => console.log(error));
  }

  authenticate() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.findToken()
      })
    };
    this.http.get<UserDetailsModel>(
      BaseUrl.BASEURL + '/api/v1/user/authenticate', httpOptions
    ).subscribe(
      (data: UserDetailsModel) => {
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
        this.userDetails = data;
        this.isAdmin = false;
        this.isTrader = false;
        this.isCustomer = false;
        this.userDetails.authorities.forEach( (auth) => {
          if (auth.authority === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
          if (auth.authority === 'ROLE_TRADER') {
            this.isTrader = true;
          }
          if (auth.authority === 'ROLE_CUSTOMER') {
            this.isCustomer = true;
          }
        });
      }
    );
  }

}
