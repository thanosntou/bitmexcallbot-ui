import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../BaseUrl.enum';
import {AuthenticationService} from '../authentication.service';

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

  constructor(private http: HttpClient, public authService: AuthenticationService) { }

  ngOnInit() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findToken(),
        'Content-Type': 'application/json'
    })};
    this.http.get<{
      client: string,
      walletBalance: number,
      activeBalance: number,
      availableMargin: number,
      earned: number
    }>(BaseUrl.BASEURL + '/api/v1/dashboard', httpOptions
    ).subscribe((data: {
      client: string,
      walletBalance: number,
      activeBalance: number,
      availableMargin: number,
      earned: number
    }) => {
      this.data = data;
    }, error => error
    );
  }

}
