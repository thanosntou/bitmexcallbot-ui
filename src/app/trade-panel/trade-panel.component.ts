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
  symbolGlobal = 'XBTUSD';
  @ViewChild('symbol') symbol: ElementRef;
  @ViewChild('side') side: ElementRef;
  @ViewChild('stopLoss') stopLoss: ElementRef;
  @ViewChild('profitTrigger') profitTrigger: ElementRef;
  @ViewChild('leverage') leverage: ElementRef;
  @ViewChild('sideManual') sideManual: ElementRef;
  @ViewChild('stopLossManual') stopLossManual: ElementRef;
  @ViewChild('profitTriggerManual') profitTriggerManual: ElementRef;
  @ViewChild('leverageManual') leverageManual: ElementRef;
  // baseUrl = 'https://www.bitmexcallbot.com';
  baseUrl = 'http://localhost:8082/BioUnion';
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
    console.log(this.symbol.nativeElement.value);
    console.log(this.side.nativeElement.value);
    console.log(this.stopLoss.nativeElement.value);
    console.log(this.profitTrigger.nativeElement.value);
    console.log(this.leverage.nativeElement.value);

    const symbol = this.symbol.nativeElement.value;
    const side = this.side.nativeElement.value;
    const stopLoss = this.stopLoss.nativeElement.value;
    const profitTrigger = this.profitTrigger.nativeElement.value;
    const leverage = this.leverage.nativeElement.value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
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

  }

  changeGlobalSymbol(symbol: string) {
    this.symbolGlobal = symbol;
  }

}
