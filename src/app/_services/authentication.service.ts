import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenModel} from '../_models/token.model';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {UserDetailsModel} from '../_models/user-details.model';
import {Router} from '@angular/router';
import {UserModel} from '../_models/user.model';
import {UserConnectionModel} from '../_models/user-connection.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private tempToken: TokenModel;
  USER_CONNECTION = 'userConnection';
  BASIC_AUTH_PASSWORD = 'Basic dGVzdDprb2JpbmVz';
  AUTH_CONTENT_TYPE = 'application/x-www-form-urlencoded';

  public jsonHeaders() {
    return {
      headers: new HttpHeaders()
        .append('Authorization', this.findAccessToken())
        .append('Content-Type', 'application/json')
    };
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getAndSetAccessToken(username: string, password: string): Observable<TokenModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': this.AUTH_CONTENT_TYPE,
        'Authorization': this.BASIC_AUTH_PASSWORD})
    };
    const body = 'username=' + username + '&password=' + password + '&grant_type=' + 'password';
    return this.http.post<TokenModel>(BaseUrl.B1 + '/oauth/token', body, httpOptions);
  }

  authenticate(token: TokenModel): Observable<UserDetailsModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token.token_type + ' ' + token.access_token
      })
    };
    return this.http.get<UserDetailsModel>(BaseUrl.B1 + '/api/v1/user/authenticate', httpOptions)
      .pipe(tap((details) => {
        console.log('in tap');
        token.timestamp = Date.now();
        this.saveUserConnectionDetails(token, details);
      }));
  }

  refreshToken(token: TokenModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': this.AUTH_CONTENT_TYPE,
        'Authorization': this.BASIC_AUTH_PASSWORD})
    };
    const body = 'grant_type=refresh_token&refresh_token=' + token.refresh_token;
    this.http.post<TokenModel>(BaseUrl.B1 + '/oauth/token', body, httpOptions).subscribe(
      (data) => this.refreshUserConnectionDetails(token),
      error => this.router.navigate(['/login'], {queryParams: {message: 'Wrong credentials'}}),
      () => {
        console.log('Access Token refreshed');
        this.authenticate(this.tempToken).subscribe(
          userDetails => {},
          error => this.router.navigate(['login'], {queryParams: {message: 'Could not authenticate'}})
        );
      }
    );
  }

  saveUserConnectionDetails(token: TokenModel, userDetails: UserDetailsModel) {
    sessionStorage.setItem(this.USER_CONNECTION, JSON.stringify(new UserConnectionModel(token, userDetails)));
  }

  refreshUserConnectionDetails(token: TokenModel) {
    sessionStorage.setItem(this.USER_CONNECTION, JSON.stringify(new UserConnectionModel(token, this.findUserDetails())));
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
    const userConObj = sessionStorage.getItem(this.USER_CONNECTION);
    if (!userConObj) {
      return null;
    }
    return <UserConnectionModel> JSON.parse(userConObj);
  }

  deleteUserConnection() {
    sessionStorage.removeItem(this.USER_CONNECTION);
    this.tempToken = null;
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
      if (auth.role === 'ADMIN') {
        status = true;
      }
    });
    return status;
  }

  isRoot() {
    let status = false;
    this.findUserRoles().forEach(auth => {
      if (auth.role === 'ROOT') {
        status = true;
      }
    });
    return status;
  }

  isRootPromise() {
    return new Promise((resolve) => {
      resolve(this.isRoot());
    });
  }

  isAdminPromise() {
    return new Promise((resolve) => {
      resolve(this.isAdmin());
    });
  }

  isTrader() {
    let status = false;
    this.findUserRoles().forEach(auth => {
      if (auth.role === 'TRADER') {
        status = true;
      }
    });
    return status;
  }

  isTraderPromise() {
    return new Promise((resolve) => {
      resolve(this.isTrader());
    });
  }

  isFollower() {
    let status = false;
    this.findUserRoles().forEach(auth => {
      if (auth.role === 'FOLLOWER') {
        status = true;
      }
    });
    return status;
  }

  isFollowerPromise() {
    return new Promise((resolve) => {
      resolve(this.isFollower());
    });
  }

  isExpired(token: TokenModel) {
    return (token.timestamp + (token.expires_in * 1000)) <= (Date.now() + 10000);
  }

  isAuthenticated() {
    return new Promise((resolve) => {
        resolve(this.findToken());
    });
  }

}
