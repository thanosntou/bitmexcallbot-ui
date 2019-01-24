import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PositionModel} from '../position.model';
import {BaseUrl} from '../BaseUrl.enum';
import {AuthenticationService} from '../authentication.service';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class OpenPositionsService implements OnInit {
  webSocket: WebSocket;
  openPositions: PositionModel[];
  positionXBTUSD: PositionModel;
  positionETHUSD: PositionModel;
  positionADAH19: PositionModel;
  positionBCHH19: PositionModel;
  positionEOSH19: PositionModel;
  positionETHH19: PositionModel;
  positionLTCH19: PositionModel;
  positionTRXH19: PositionModel;
  positionXRPH19: PositionModel;
  openXBTUSD = false;
  openETHUSD = false;
  openADAH19 = false;
  openBCHH19 = false;
  openEOSH19 = false;
  openETHH19 = false;
  openLTCH19 = false;
  openTRXH19 = false;
  openXRPH19 = false;

  constructor(private http: HttpClient, public authService: AuthenticationService) {
    const exampleSocket = new WebSocket('wss://testnet.bitmex.com/realtime');
    exampleSocket.onopen = function () {
      exampleSocket.send(
        '{"op": "authKeyExpires", "args": ["obt_f-85F7m2Olfi9IIUUlTG", ' +
        '1600883067, ' +
        '"71c2f5ff56dc905bb9ada3b6f20b950b19b7c30716e9af2160a3e27c78d1b2ee"]}');
      exampleSocket.send('{"op": "subscribe", "args": ["position"]}');
      // exampleSocket.send('{"op": "subscribe", "args": ["position:XBTUSD"]}');
    };

    this.webSocket = exampleSocket;

    this.webSocket.onmessage = event => {
      this.fetchOpenOrders();
    };
  }

  ngOnInit() {

  }

  fetchOpenOrders() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/json'
      })};

    this.http.get<PositionModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader/active_positions', httpOptions
    ).subscribe((data: PositionModel[]) => {
      this.openPositions = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol));
    }, error => error,
      () => this.openPositions.forEach(i => {
      if (i.symbol === 'XBTUSD') {
        this.positionXBTUSD = i;
        this.openXBTUSD = true;
      }
      if (i.symbol === 'ETHUSD') {
        this.positionETHUSD = i;
        this.openETHUSD = true;
      }
      if (i.symbol === 'ADAH19') {
        this.positionADAH19 = i;
        this.openADAH19 = true;
      }
      if (i.symbol === 'BCHH19') {
        this.positionBCHH19 = i;
        this.openBCHH19 = true;
      }
      if (i.symbol === 'EOSH19') {
        this.positionEOSH19 = i;
        this.openEOSH19 = true;
      }
      if (i.symbol === 'ETHH19') {
        this.positionETHH19 = i;
        this.openETHH19 = true;
      }
      if (i.symbol === 'LTCH19') {
        this.positionLTCH19 = i;
        this.openLTCH19 = true;
      }
      if (i.symbol === 'TRXH19') {
        this.positionTRXH19 = i;
        this.openTRXH19 = true;
      }
      if (i.symbol === 'XRPH19') {
        this.positionXRPH19 = i;
        this.openXRPH19 = true;
      }
    }));
  }

  onClosePosition(symbol: string) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/json',
      })};
    this.http.delete<void>(
      BaseUrl.BASEURL + '/api/v1/trade/position?symbol=' + symbol, httpOptions
    ).subscribe(
      () => {
        if (symbol === 'XBTUSD') {
              this.positionXBTUSD = undefined;
              this.openXBTUSD = false;
            }
            if (symbol === 'ETHUSD') {
              this.positionETHUSD = undefined;
              this.openETHUSD = false;
            }
            if (symbol === 'ADAH19') {
              this.positionADAH19 = undefined;
              this.openADAH19 = false;
            }
            if (symbol === 'BCHH19') {
              this.positionBCHH19 = undefined;
              this.openBCHH19 = false;
            }
            if (symbol === 'EOSH19') {
              this.positionEOSH19 = undefined;
              this.openEOSH19 = false;
            }
            if (symbol === 'ETHH19') {
              this.positionETHH19 = undefined;
              this.openETHH19 = false;
            }
            if (symbol === 'LTCH19') {
              this.positionLTCH19 = undefined;
              this.openLTCH19 = false;
            }
            if (symbol === 'TRXH19') {
              this.positionTRXH19 = undefined;
              this.openTRXH19 = false;
            }
            if (symbol === 'XRPH19') {
              this.positionXRPH19 = undefined;
              this.openXRPH19 = false;
            }
        },
        error => console.log(error));
  }

}
