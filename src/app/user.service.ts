import {UserModel} from './user.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from './BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  user: UserModel;

  constructor(private authService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {}

  findById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.get<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user?id=' + id, httpOptions
    ).subscribe(
      (data: UserModel) => this.user = data,
      error => console.log(error)
    );
  }
}
