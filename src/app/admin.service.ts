import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginModel } from './login.model';
import {Injectable, OnInit} from '@angular/core';
import {BaseUrl} from './BaseUrl.enum';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AdminService implements OnInit {
  logins: LoginModel[];

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    this.http.get<LoginModel[]>(BaseUrl.BASEURL + '/api/v1/admin/logins', httpOptions)
      .subscribe((data: LoginModel[]) => this.logins = data.reverse());
  }

  ngOnInit() {

  }
}
