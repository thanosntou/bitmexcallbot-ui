import {HttpClient} from '@angular/common/http';
import {PositionModel} from '../_models/position.model';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {Injectable, OnInit} from '@angular/core';
import {OrderReportModel} from '../_models/order-report.model';

@Injectable({
  providedIn: 'root'
})
export class OpenPositionsService implements OnInit {

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
    return this.http.get<PositionModel[]>(BaseUrl.B1 + '/api/v1/trader/followers/open-positions/guide');
  }

  fetchOpenPositionsOf(userId: number) {
    return this.http.get<PositionModel[]>(BaseUrl.B1 + '/api/v1/customer/open-positions?id=' + userId);
  }

  closeLimitOrder(symbol: string, side: string, qtyPerc: number, price: number) {
    const body = 'symbol=' + symbol +
      '&ordType=Limit' +
      '&side=' + side +
      '&percentage=' + qtyPerc +
      '&price=' + price +
      '&execInst=Close';

    return this.http.post<OrderReportModel>(BaseUrl.B2 + '/api/v1/trade/close-limit-all', body);
  }

  onCloseMarketPosition(symbol: string) {
    return this.http.delete<void>(BaseUrl.B2 + '/api/v1/trade/position?symbol=' + symbol);
  }

}
