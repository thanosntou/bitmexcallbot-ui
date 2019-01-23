import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../authentication.service';
import {OpenPositionsService} from '../open-positions.service';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.css'],
})
export class OpenPositionsComponent implements OnInit {

  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              public openPositionService: OpenPositionsService) {}

  ngOnInit() {
    this.openPositionService.orderPlaced.subscribe(
      () => {
        console.log('event caught. in service');
        this.openPositionService.fetchOpenOrders();
      });

    this.openPositionService.fetchOpenOrders();



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
    //   this.fetchOpenOrders();
    // };
  }

  onClosePosition(symbol: string) {
    this.openPositionService.onClosePosition(symbol);
  }

  fetchOpenPositions() {
    this.openPositionService.fetchOpenOrders();
  }

}
