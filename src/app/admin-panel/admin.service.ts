import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login.model';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class AdminService implements OnInit{
  loginList: LoginModel[];

  constructor(private http: HttpClient) {}

  public fetchAllLogins() {
    this.http.get<LoginModel[]>('http://localhost:8082/BioUnion/api/v1/admin/logins')
      .subscribe((data: LoginModel[]) => this.loginList = data);
    console.log('Login list fetched');
    return this.loginList;
  }

  ngOnInit(): void {
  }
}
