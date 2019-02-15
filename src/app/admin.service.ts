import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginModel } from './login.model';
import {Injectable, OnInit} from '@angular/core';
import {BaseUrl} from './BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  logins: LoginModel[];
  users: UserModel[];

  constructor(private http: HttpClient,
              public authService: AuthenticationService) {}

  fetchLogins() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
    })};

    this.http.get<LoginModel[]>(
      BaseUrl.BASEURL + '/api/v1/admin/logins', httpOptions
    ).subscribe(
      (data: LoginModel[]) => {
        this.logins = data.reverse();
      },
      error => console.log(JSON.stringify(error))
    );
  }

  fetchUsers() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
      })};

    this.http.get<UserModel[]>(
      BaseUrl.BASEURL + '/api/v1/user/all', httpOptions
    ).subscribe(
      (data: UserModel[]) => {
        this.users = data.reverse();
      },
      error => console.log(JSON.stringify(error))
    );
  }

  deleteUser(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};
    this.http.delete<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/' + id, httpOptions
    ).subscribe(
      (data: UserModel) => {

        // this.users.splice(this.users.indexOf(data), 1);
        this.users = this.users.filter(i => i.id !== id);
      },
      error => console.log(JSON.stringify(error))
    );
  }

}
