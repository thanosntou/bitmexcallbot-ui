import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenModel} from './_model/token.model';
import {BaseUrl} from './_enum/BaseUrl.enum';
import {UserDetailsModel} from './_model/user-details.model';
import {Router} from '@angular/router';
import {UserModel} from './_model/user.model';
import {UserConnectionModel} from './user-connection.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tempToken: TokenModel;

  constructor(private http: HttpClient, private router: Router) {}

  getAndSetAccessToken(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic dGVzdDprb2JpbmVz'})
    };
    const body = 'username=' + username
      + '&password=' + password
      + '&grant_type=' + 'password';

    this.http.post<TokenModel>(
      BaseUrl.BASEURL + '/oauth/token', body, httpOptions
    ).subscribe(
      (data: TokenModel) => this.tempToken = data,
      error => {
        console.log(error);
        this.router.navigate(['/login'], {queryParams: {message: 'Wrong credentials'}});
      },
      () => this.authenticate(this.tempToken)
    );
  }

  authenticate(token: TokenModel) {
    token.timestamp = Date.now();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token.token_type + ' ' + token.access_token
      })
    };

    this.http.get<UserDetailsModel>(
      BaseUrl.BASEURL + '/api/v1/user/authenticate', httpOptions
    ).subscribe(
      (data: UserDetailsModel) => {
        sessionStorage.setItem('userConnection', JSON.stringify(new UserConnectionModel(token, data)));
      },
      error => {
        console.log(error);
        this.router.navigate(['/login'], {queryParams: {message: 'Wrong credentials'}});
      },
      () => {
        if (this.isTrader()) {
          this.router.navigate(['/trade']);
        } else {
          this.router.navigate(['/settings']);
        }
      }
    );
  }

  refreshToken(token: TokenModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic dGVzdDprb2JpbmVz'})
    };
    const body = 'grant_type=refresh_token&refresh_token=' + token.refresh_token;

    this.http.post<TokenModel>(
      BaseUrl.BASEURL + '/oauth/token', body, httpOptions
    ).subscribe(
      (data: TokenModel) => this.tempToken = data,
      error => {
        console.log(error);
        this.router.navigate(['/login'], {queryParams: {message: 'Wrong credentials'}});
      },
      () => {
        console.log('Access Token refreshed');
        this.authenticate(this.tempToken);
      }
    );
  }

  findAccessToken() {
    let token = this.findToken();
    if (!token) {
      this.deleteUserConnection();
      this.router.navigate(['/login']);
    } else {
      if (this.isExpired(token)) {
        this.refreshToken(token);
        token = this.findToken();
        if (this.isExpired(token)) {
          this.deleteUserConnection();
          this.router.navigate(['/login']);
        }
      }
      return token.token_type + ' ' + token.access_token;
    }
  }

  findToken() {
    const userConnection = this.findUserConnection();
    if (!userConnection) {
      return null;
    }
    return userConnection.token;
  }

  findUserRoles() {
    const userDetails = this.findUserDetails();
    if (!userDetails) {
      return null;
    }
    return userDetails.authorities;
  }

  findUserDetails() {
    const userConnection = this.findUserConnection();
    if (!userConnection) {
      return null;
    }
    return userConnection.userDetails;
  }

  findUserConnection() {
    const userConObj = sessionStorage.getItem('userConnection');
    if (!userConObj) {
      return null;
    }
    return <UserConnectionModel> JSON.parse(userConObj);
  }

  deleteUserConnection() {
    sessionStorage.removeItem('userConnection');
  }

  refreshUser(user: UserModel) {
    const userConnection = this.findUserConnection();
    if (userConnection) {
      userConnection.userDetails.user = user;
      sessionStorage.setItem('userConnection', JSON.stringify(userConnection));
    }
  }

  isAdmin() {
    let status = false;
    this.findUserRoles().forEach(auth => {
      if (auth.authority === 'ROLE_ADMIN') {
        status = true;
      }
    });
    return status;
  }

  isTrader() {
    let status = false;
    this.findUserRoles().forEach(auth => {
      if (auth.authority === 'ROLE_TRADER') {
        status = true;
      }
    });
    return status;
  }

  isExpired(token: TokenModel) {
    return (token.timestamp + (token.expires_in * 1000)) <= (Date.now() + 10000);
  }

}
