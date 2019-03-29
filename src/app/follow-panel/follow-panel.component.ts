import { Component, OnInit } from '@angular/core';
import {UserModel} from '../_model/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../_enum/BaseUrl.enum';
import {AuthenticationService} from '../authentication.service';
import {SymbolService} from '../symbol.service';

@Component({
  selector: 'app-follow-panel',
  templateUrl: './follow-panel.component.html',
  styleUrls: ['./follow-panel.component.css']
})
export class FollowPanelComponent implements OnInit {
  personalTrader: UserModel;
  activeTraders: UserModel[];

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              public symbolService: SymbolService) {
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
      })
    };
    this.http.get<UserModel>(
      BaseUrl.B1 + '/api/v1/follower/personal', httpOptions
    ).subscribe(
      (data: UserModel) => this.personalTrader = data,
      error => console.log(JSON.stringify(error))
    );
    this.http.get<UserModel[]>(
      BaseUrl.B1 + '/api/v1/trader', httpOptions
    ).subscribe(
      (data: UserModel[]) => this.activeTraders = data,
      error => console.log(JSON.stringify(error))
    );
  }

  onFollow(trader: UserModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = 'traderId=' + trader.id;
    this.http.post<UserModel>(
      BaseUrl.B1 + '/api/v1/customer/follow', body, httpOptions
    ).subscribe(
      (data: UserModel) => this.personalTrader = data,
      error => console.log(JSON.stringify(error))
    );
  }

  onUnfollow() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = '';
    this.http.post<UserModel>(
      BaseUrl.B1 + '/api/v1/follower/unfollow', body, httpOptions
    ).subscribe(
      (data: UserModel) => this.personalTrader = null,
      error => console.log(JSON.stringify(error))
    );
  }

}
