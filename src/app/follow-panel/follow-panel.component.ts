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

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              public symbolService: SymbolService) {
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const param = 'symbol=' + this.symbolService.symbolGlobal;

    this.http.delete<void>(BaseUrl.BASEURL + '/api/v1/trade/position?' + param, httpOptions
    ).subscribe(() => error => console.log(JSON.stringify(error.json())));
  }

}
