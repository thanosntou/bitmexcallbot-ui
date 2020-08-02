import { Component, OnInit } from '@angular/core';
import {UserModel} from '../_models/user.model';
import {HttpClient} from '@angular/common/http';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-follow-panel',
  templateUrl: './follow-panel.component.html',
  styleUrls: ['./follow-panel.component.css']
})
export class FollowPanelComponent implements OnInit {
  personalTrader: UserModel;
  activeTraders: UserModel[];

  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.http.get<UserModel>(BaseUrl.B1 + '/api/v1/follower/trader', this.authService.jsonHeaders())
      .subscribe(
        (data: UserModel) => this.personalTrader = data,
        error => console.log(JSON.stringify(error))
      );
    this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/follower/traders', this.authService.jsonHeaders())
      .subscribe(
        (data: UserModel[]) => this.activeTraders = data,
        error => console.log(JSON.stringify(error))
      );
  }

  onFollow(trader: UserModel) {
    const params = 'traderId=' + trader.id;
    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/follower/trader?' + params, null, this.authService.jsonHeaders())
      .subscribe(
        (data: UserModel) => this.personalTrader = data,
        error => console.log(JSON.stringify(error))
      );
  }

  onUnfollow() {
    this.http.delete<UserModel>(BaseUrl.B1 + '/api/v1/follower/trader', this.authService.jsonHeaders())
      .subscribe(
        () => this.personalTrader = null,
        error => console.log(JSON.stringify(error))
      );
  }

}
