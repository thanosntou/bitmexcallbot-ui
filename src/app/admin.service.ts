import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginModel } from './login.model';
import {Injectable, OnInit} from '@angular/core';
import {BaseUrl} from './BaseUrl.enum';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  logins: LoginModel[];

  constructor(private http: HttpClient,
              public authService: AuthenticationService) {}

  fetchLogins() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findToken(),
    })};
    this.http.get<LoginModel[]>(
      BaseUrl.BASEURL + '/api/v1/admin/logins', httpOptions
    ).subscribe((data: LoginModel[]) => {
      this.logins = data.reverse();
    });
  }

}
