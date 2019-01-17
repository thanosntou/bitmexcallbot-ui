import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderModel} from '../order.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PositionModel} from '../position.model';

@Component({
  selector: 'app-trade-panel',
  templateUrl: './trade-panel.component.html',
  styleUrls: ['./trade-panel.component.css']
})
export class TradePanelComponent implements OnInit {
  manualTab = 'Limit';
  symbolGlobal = 'XBTUSD';
  @ViewChild('symbol') symbol: ElementRef;
  @ViewChild('side') side: ElementRef;
  @ViewChild('stopLoss') stopLoss: ElementRef;
  @ViewChild('profitTrigger') profitTrigger: ElementRef;
  @ViewChild('leverage') leverage: ElementRef;

  @ViewChild('sideManual') sideManual: ElementRef;
  @ViewChild('priceManual') priceManual: ElementRef;
  @ViewChild('stopPxManual') stopPxManual: ElementRef;
  @ViewChild('stopLossManual') stopLossManual: ElementRef;
  @ViewChild('profitTriggerManual') profitTriggerManual: ElementRef;
  @ViewChild('leverageManual') leverageManual: ElementRef;

  baseUrl = 'https://www.bitmexcallbot.com';
  // baseUrl = 'http://localhost:8082/BioUnion';
  activeOrders: OrderModel[];
  activePositions: PositionModel[];
  isHidden1 = true;
  isHidden2 = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<OrderModel[]>(this.baseUrl + '/api/v1/trader/active_orders')
      .subscribe((data: OrderModel[]) => this.activeOrders = data.reverse());

    this.http.get<PositionModel[]>(this.baseUrl + '/api/v1/trader/active_positions')
      .subscribe((data: PositionModel[]) => this.activePositions = data.reverse());
  }

  hideOrShow1() {
    this.isHidden1 = !this.isHidden1;
  }

  hideOrShow2() {
    this.isHidden2 = !this.isHidden2;
  }

  onSendSignal() {
    const symbol = this.symbolGlobal;
    const side = this.side.nativeElement.value;
    const stopLoss = this.stopLoss.nativeElement.value;
    const profitTrigger = this.profitTrigger.nativeElement.value;
    const leverage = this.leverage.nativeElement.value;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    const body = 'symbol=' + symbol
      + '&side=' + side
      + '&stopLoss=' + stopLoss
      + '&profitTrigger=' + profitTrigger
      + '&leverage=' + leverage;

    this.http.post<void>(
      this.baseUrl + '/api/v1/trader/signal',
      body,
      httpOptions
    ).subscribe((data) => console.log(data));
  }

  onPlaceOrder() {
    const symbol = this.symbolGlobal;
    const side = this.sideManual.nativeElement.value;
    const ordType = this.manualTab;
    let price;
    let stopPx;
    let execInst;
    const leverage = this.leverageManual.nativeElement.value;

    let body = 'symbol=' + symbol
      + '&side=' + side
      + '&ordType=' + ordType
      + '&leverage=' + leverage;

    if (ordType === 'Limit') {
      price = this.priceManual.nativeElement.value;
      body += '&price=' + price;

    } else if (ordType === 'Stop') {
      stopPx = this.stopPxManual.nativeElement.value;
      execInst = 'Close,LastPrice';
      body += '&execInst=' + execInst + '&stopPx=' + stopPx;

    } else if (ordType === 'StopLimit') {
      price = this.priceManual.nativeElement.value;
      stopPx = this.stopPxManual.nativeElement.value;
      execInst = 'Close,LastPrice';
      body += '&price=' + price + '&stopPx=' + stopPx + '&execInst=' + execInst;
    }

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    console.log(body);

    this.http.post<void>(
      this.baseUrl + '/api/v1/trader/orderAll', body, httpOptions
    ).subscribe((data) => console.log(data));
  }

  changeGlobalSymbol(symbol: string) {
    this.symbolGlobal = symbol;
  }

  showManualTab(manualTab: string) {
    this.manualTab = manualTab;
  }

  onCancelAll() {
    const symbol = this.symbolGlobal;
    const body = 'symbol=' + symbol;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    this.http.post<void>(
      this.baseUrl + '/api/v1/trader/order/cancelAll', body, httpOptions
    ).subscribe(() => alert('ok'),
        error => console.log(JSON.stringify(error.json())));
  }

}
