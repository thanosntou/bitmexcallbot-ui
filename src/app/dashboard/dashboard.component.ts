import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from '../_services/authentication.service';
import {ActiveOrdersService} from '../_services/active-orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: {
    client: string,
    walletBalance: number,
    activeBalance: number,
    availableMargin: number,
    earned: number
  };

  constructor(private http: HttpClient,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.http.get<{
      client: string,
      walletBalance: number,
      activeBalance: number,
      availableMargin: number,
      earned: number
    }>(BaseUrl.B1 + '/api/v1/follower/dashboard')
      .subscribe(
      (data: {
        client: string,
        walletBalance: number,
        activeBalance: number,
        availableMargin: number,
        earned: number
      }) => {
      this.data = data;
    },
      error => error
    );
  }

}
