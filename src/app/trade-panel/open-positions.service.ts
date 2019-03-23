import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PositionModel} from '../_model/position.model';
import {BaseUrl} from '../_enum/BaseUrl.enum';
import {AuthenticationService} from '../authentication.service';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class OpenPositionsService implements OnInit {
  openPositions: PositionModel[];

  constructor(
    public authService: AuthenticationService,
    private http: HttpClient) {

    // const exampleSocket = new WebSocket('wss://testnet.bitmex.com/realtime');
    // exampleSocket.onopen = function () {
    //   exampleSocket.send(
    //     '{"op": "authKeyExpires", "args": ["obt_f-85F7m2Olfi9IIUUlTG", ' +
    //     '1600883067, ' +
    //     '"71c2f5ff56dc905bb9ada3b6f20b950b19b7c30716e9af2160a3e27c78d1b2ee"]}');
    //   exampleSocket.send('{"op": "subscribe", "args": ["position"]}');
    //   // exampleSocket.send('{"op": "subscribe", "args": ["position:XBTUSD"]}');
    // };
    //
    // this.webSocket = exampleSocket;

    // this.webSocket.onmessage = event => {
    // };
  }

  ngOnInit() {}

  fetchOpenPositions() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};
    this.http.get<PositionModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader/active_positions', httpOptions
    ).subscribe(
      (data: PositionModel[]) => this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
      error => error,
      () => (data: PositionModel[]) => this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol))
    );
  }

  fetchOpenPositionsOf(userId: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};
    this.http.get<PositionModel[]>(
      BaseUrl.BASEURL + '/api/v1/user/active_positions?id=' + userId, httpOptions
    ).subscribe(
      (data: PositionModel[]) => this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
      error => console.log(error)
    );
  }

  closeLimitOrder(symbol: string, side: string, qtyPerc: number, price: number) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    const body = 'symbol=' + symbol +
      '&orderType=Limit' +
      '&side=' + side +
      '&percentage=' + qtyPerc +
      '&price=' + price +
      '&execInst=Close';

    this.http.post<void>(
      BaseUrl.B2 + '/api/v1/trade/orderAll2', body, httpOptions
    ).subscribe(
      () => this.fetchOpenPositions(),
      error => console.log(error)
    );
  }

  onCloseMarketPosition(symbol: string) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};
    this.http.delete<void>(
      BaseUrl.B2 + '/api/v1/trade/position?symbol=' + symbol, httpOptions
    ).subscribe(
      () => this.openPositions = this.openPositions.filter(position => position.symbol !== symbol),
      error => console.log(error)
    );
  }

  clearAll() {
    this.openPositions = null;
  }

}
