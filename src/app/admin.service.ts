import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login.model';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class AdminService implements OnInit {
  baseUrl = 'https://www.bitmexcallbot.com';
  logins: LoginModel[];

  constructor(private http: HttpClient) {
    this.http.get<LoginModel[]>(this.baseUrl + '/api/v1/admin/logins')
      .subscribe((data: LoginModel[]) => this.logins = data.reverse());
  }

  ngOnInit() {

  }
}
