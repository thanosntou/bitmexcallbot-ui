import { Component, OnInit } from '@angular/core';
import {AdminService} from './admin.service';
import {LoginModel} from './login.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [AdminService]
})
export class AdminPanelComponent implements OnInit {
  baseUrl = 'https://www.bitmexcallbot.com';
  logins: LoginModel[];

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit() {
    this.http.get<LoginModel[]>(this.baseUrl + '/api/v1/admin/logins')
      .subscribe((data: LoginModel[]) => this.logins = data);
    console.log('Logins are fetched');
  }
}
