import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderModel} from '../order.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PositionModel} from '../position.model';
import {Symbol} from '../Symbol.enum';

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
  @ViewChild('price') price: ElementRef;
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
    const price = this.price.nativeElement.value;
    const execInst = this.symbolGlobal === 'Stop' || 'StopLimit' ? 'Close,LastPrice' : null;
    const stopPx = this.stopPxManual.nativeElement.value;
    const leverage = this.leverageManual.nativeElement.value;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    const body = 'symbol=' + symbol
      + '&side=' + side
      + 'ordType' + ordType
      + 'price' + price
      + '&execInst=' + execInst
      + '&stopPx=' + stopPx
      + '&leverage=' + leverage;

    this.http.post<void>(
      this.baseUrl + '/api/v1/trader/orderAll', body, httpOptions
    );
  }

  changeGlobalSymbol(symbol: string) {
    this.symbolGlobal = symbol;
  }

  showManualTab(manualTab: string) {
    this.manualTab = manualTab;
  }

}
