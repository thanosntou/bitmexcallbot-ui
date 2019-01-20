import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderModel} from '../order.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PositionModel} from '../position.model';
import {BaseUrl} from '../BaseUrl.enum';
import {AuthenticationService} from '../authentication.service';
import {Symbol} from '../Symbol.enum';
import {SymbolService} from '../symbol.service';

@Component({
  selector: 'app-trade-panel',
  templateUrl: './trade-panel.component.html',
  styleUrls: ['./trade-panel.component.css']
})
export class TradePanelComponent implements OnInit {
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

  isHidden1 = true;
  isHidden2 = true;
  manualTab = 'Limit';

  defValues = new Map<string>();
  priceSteps = new Map<string>();
  maxLeverages = new Map<string>();

  activeOrders: OrderModel[];
  activePositions: PositionModel[];


  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              public symbolService: SymbolService) {
    this.priceSteps.set(Symbol.XBTUSD, 0.1);
    this.priceSteps.set(Symbol.ETHUSD, 0.01);
    this.priceSteps.set(Symbol.ADA, 0.00000001);
    this.priceSteps.set(Symbol.BCH, 0.0001);
    this.priceSteps.set(Symbol.EOS, 0.0000001);
    this.priceSteps.set(Symbol.ETH, 0.00001);
    this.priceSteps.set(Symbol.LTC, 0.00001);
    this.priceSteps.set(Symbol.TRX, 0.00000001);
    this.priceSteps.set(Symbol.XRP, 0.00000001);

    this.defValues.set(Symbol.XBTUSD, 3698.0);
    this.defValues.set(Symbol.ETHUSD, 123.00);
    this.defValues.set(Symbol.ADA, 0.00001287);
    this.defValues.set(Symbol.BCH, 0.0362);
    this.defValues.set(Symbol.EOS, 0.0006878);
    this.defValues.set(Symbol.ETH, 0.03474);
    this.defValues.set(Symbol.LTC, 0.00907);
    this.defValues.set(Symbol.TRX, 0.00000684);
    this.defValues.set(Symbol.XRP, 0.00009198);

    this.maxLeverages.set(Symbol.XBTUSD, 100);
    this.maxLeverages.set(Symbol.ETHUSD, 50);
    this.maxLeverages.set(Symbol.ADA, 20);
    this.maxLeverages.set(Symbol.BCH, 20);
    this.maxLeverages.set(Symbol.EOS, 20);
    this.maxLeverages.set(Symbol.ETH, 50);
    this.maxLeverages.set(Symbol.LTC, 33.3);
    this.maxLeverages.set(Symbol.TRX, 20);
    this.maxLeverages.set(Symbol.XRP, 20);
  }

  ngOnInit() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      })};

    this.http.get<OrderModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader/active_orders', httpOptions
    ).subscribe((data: OrderModel[]) =>
      this.activeOrders = data.reverse());

    this.http.get<PositionModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader/active_positions', httpOptions
    ).subscribe((data: PositionModel[]) =>
      this.activePositions = data.reverse());
  }

  onSendSignal() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    const body = 'symbol=' + this.symbolService.symbolGlobal
      + '&side=' + this.side.nativeElement.value
      + '&stopLoss=' + this.stopLoss.nativeElement.value
      + '&profitTrigger=' + this.profitTrigger.nativeElement.value
      + '&leverage=' + this.leverage.nativeElement.value;

    this.http.post<void>(
      BaseUrl.BASEURL + '/api/v1/trade/signal', body, httpOptions
    ).subscribe((data) =>
      console.log(data));
  }

  onPlaceOrder() {
    const symbol = this.symbolService.symbolGlobal;
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

    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<void>(
      BaseUrl.BASEURL + '/api/v1/trade/orderAll', body, httpOptions
    ).subscribe((data) => console.log(data));
  }

  onCancelOne(orderId: number) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.delete<void>(
      BaseUrl.BASEURL + '/api/v1/trade/order?symbol=' + this.symbolService.symbolGlobal + '&orderId=' + orderId, httpOptions
    ).subscribe(() =>
      error => console.log(JSON.stringify(error.json())));
  }

  onCancelAll() {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.delete<void>(
      BaseUrl.BASEURL + '/api/v1/trade/order', httpOptions
    ).subscribe(() =>
      error => console.log(JSON.stringify(error.json())));
  }

  onClosePosition(symbol: string) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.delete<void>(
      BaseUrl.BASEURL + '/api/v1/trade/position?symbol=' + symbol, httpOptions
    ).subscribe(() =>
        error => console.log(JSON.stringify(error.json()))
    );
  }

  changeGlobalSymbol(symbol: string) {
    this.symbolService.symbolGlobal = symbol;
  }

  showManualTab(manualTab: string) {
    this.manualTab = manualTab;
  }

  hideOrShow1() {
    this.isHidden1 = !this.isHidden1;
  }

  hideOrShow2() {
    this.isHidden2 = !this.isHidden2;
  }
}
