import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../BaseUrl.enum';
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
        'Authorization': this.authService.findToken()
      })
    };
    this.http.get<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/personal?', httpOptions
    ).subscribe(
      (data: UserModel) => this.personalTrader = data,
      error => console.log(JSON.stringify(error))
    );
    this.http.get<UserModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader', httpOptions
    ).subscribe(
      (data: UserModel[]) => this.activeTraders = data,
      error => console.log(JSON.stringify(error))
    );
  }

  onFollow(trader: UserModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = 'traderId=' + trader.id;
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/follow', body, httpOptions
    ).subscribe(
      (data: UserModel) => this.personalTrader = data,
      error => console.log(JSON.stringify(error))
    );
  }

  onUnfollow() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = '';
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/unfollow', body, httpOptions
    ).subscribe(
      (data: UserModel) => this.personalTrader = null,
      error => console.log(JSON.stringify(error))
    );
  }

}
