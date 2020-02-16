import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Symbol} from '../_enums/Symbol.enum';
import {SymbolService} from '../_services/symbol.service';
import {OpenPositionsComponent} from './open-positions/open-positions.component';
import {OpenPositionsService} from '../_services/open-positions.service';
import {ActiveOrdersService} from '../_services/active-orders.service';
import {ActiveOrdersComponent} from './active-orders/active-orders.component';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TradeService} from '../_services/trade.service';
import {PositionModel} from '../_models/position.model';
import {ActiveOrderModel} from '../_models/active-order.model';


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
  @ViewChild('hidden') hidden: ElementRef;
  @ViewChild('percentage') percentage: ElementRef;

  @ViewChild(OpenPositionsComponent) openPositionsComp: OpenPositionsComponent;
  @ViewChild(ActiveOrdersComponent) activeOrdersComp: ActiveOrdersComponent;

  successMessage: string;
  closeResult: string;
  modalField1: any;
  modalField2: any;
  private _success = new Subject<string>();
  isHidden1 = true;
  isHidden2 = true;
  manualTab = 'Limit';

  activeOrders: ActiveOrderModel[];
  openPositions: PositionModel[];

  defValues = new Map<string>();
  priceSteps = new Map<string>();
  maxLeverages = new Map<string>();

  constructor(
    private authService: AuthenticationService,
    private openPositionsService: OpenPositionsService,
    private activeOrdersService: ActiveOrdersService,
    public symbolService: SymbolService,
    private modalService: NgbModal,
    private tradeService: TradeService
  ) {

    this.priceSteps.set(Symbol.XBTUSD.valueOf(), 0.1);
    this.priceSteps.set(Symbol.ETHUSD.valueOf(), 0.01);
    this.priceSteps.set(Symbol.ADAXXX.valueOf(), 0.00000001);
    this.priceSteps.set(Symbol.BCHXXX.valueOf(), 0.0001);
    this.priceSteps.set(Symbol.EOSXXX.valueOf(), 0.0000001);
    this.priceSteps.set(Symbol.ETHXXX.valueOf(), 0.00001);
    this.priceSteps.set(Symbol.LTCXXX.valueOf(), 0.00001);
    this.priceSteps.set(Symbol.TRXXXX.valueOf(), 0.00000001);
    this.priceSteps.set(Symbol.XRPXXX.valueOf(), 0.00000001);

    this.defValues.set(Symbol.XBTUSD.valueOf(), 3698.0);
    this.defValues.set(Symbol.ETHUSD.valueOf(), 123.00);
    this.defValues.set(Symbol.ADAXXX.valueOf(), 0.00001287);
    this.defValues.set(Symbol.BCHXXX.valueOf(), 0.0362);
    this.defValues.set(Symbol.EOSXXX.valueOf(), 0.0006878);
    this.defValues.set(Symbol.ETHXXX.valueOf(), 0.03474);
    this.defValues.set(Symbol.LTCXXX.valueOf(), 0.00907);
    this.defValues.set(Symbol.TRXXXX.valueOf(), 0.00000684);
    this.defValues.set(Symbol.XRPXXX.valueOf(), 0.00009198);

    this.maxLeverages.set(Symbol.XBTUSD.valueOf(), 100);
    this.maxLeverages.set(Symbol.ETHUSD.valueOf(), 50);
    this.maxLeverages.set(Symbol.ADAXXX.valueOf(), 20);
    this.maxLeverages.set(Symbol.BCHXXX.valueOf(), 20);
    this.maxLeverages.set(Symbol.EOSXXX.valueOf(), 20);
    this.maxLeverages.set(Symbol.ETHXXX.valueOf(), 50);
    this.maxLeverages.set(Symbol.LTCXXX.valueOf(), 33.3);
    this.maxLeverages.set(Symbol.TRXXXX.valueOf(), 20);
    this.maxLeverages.set(Symbol.XRPXXX.valueOf(), 20);

    // const exampleSocket = new WebSocket('wss://testnet.bitmex.com/realtime');
    // exampleSocket.onopen = function () {
    //   exampleSocket.send(
    //       '{"op": "authKeyExpires", "args": ["obt_f-85F7m2Olfi9IIUUlTG", ' +
    //       '1600883067, ' +
    //       '"71c2f5ff56dc905bb9ada3b6f20b950b19b7c30716e9af2160a3e27c78d1b2ee"]}');
    //   // exampleSocket.send('{"op": "subscribe", "args": ["position"]}');
    //   exampleSocket.send('{"op": "subscribe", "args": ["position:XBTUSD"]}');
    //   exampleSocket.send('{"op": "subscribe", "args": ["position:ADAH19"]}');
    // };
    //
    // this.exampleSocket = exampleSocket;
  }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = null);
    // this.exampleSocket.onmessage = event => {
    //   const msg = JSON.parse(event.data);
    //   this.markPriceXBTUSD = msg.data['0'].markPrice;
    //   $(function () {
    //     $('#markPriceTdXBTUSD').delay(150).animate({
    //       'background-color': '#ffeb79'
    //     }, 350, function () {
    //       $('#markPriceTdXBTUSD').animate({
    //         'background-color': '#fff'
    //       }, 200);
    //     });
    //   });
    //   console.log(msg.data['0']);
    // };
    // const httpOptions = { headers: new HttpHeaders({
    //     'Authorization': this.authService.bearerToken,
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // })};
    //
    // this.http.get<OrderModel[]>(
    //   BaseUrl.B1 + '/api/v1/trader/active_orders', httpOptions
    // ).subscribe((data: OrderModel[]) =>
    //   this.activeOrders = data.reverse());
  }

  onSendSignal() {
    const body = 'symbol=' + this.symbolService.symbolGlobal
      + '&side=' + this.side.nativeElement.value
      + '&stopLoss=' + this.stopLoss.nativeElement.value
      + '&profitTrigger=' + this.profitTrigger.nativeElement.value
      + '&leverage=' + this.leverage.nativeElement.value;

    this.tradeService.sendSignal(body).subscribe(
      (data) => {
        this.activeOrdersComp.fetchActiveOrders().subscribe(
          (data2: ActiveOrderModel[]) => this.activeOrders = data2.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
          error => error,
        );
        this.openPositionsComp.fetchOpenPositions().subscribe(
          (data3: PositionModel[]) => this.openPositions = data3.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
          error => error
        );
        this._success.next('Signal placed successfully');
      },
      error => console.log(JSON.stringify(error))
    );
  }

  onPlaceOrder() {
    const symbol = this.symbolService.symbolGlobal;
    const side = this.sideManual.nativeElement.value;
    const ordType = this.manualTab;
    const hidden = this.hidden.nativeElement.value;
    const percentage = this.percentage.nativeElement.value;
    let price;
    let stopPx;
    let execInst;
    const leverage = this.leverageManual.nativeElement.value;

    let body = 'symbol=' + symbol
      + '&side=' + side
      + '&ordType=' + ordType
      + '&leverage=' + leverage
      + '&hidden=' + hidden
      + '&percentage=' + percentage;

    if (ordType === 'Limit') {
      body += '&price=' + this.priceManual.nativeElement.value;

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
    this.tradeService.orderAll(body).subscribe(
      (data) => {
        this.activeOrdersComp.fetchActiveOrders();
        this.openPositionsComp.fetchOpenPositions();
        this._success.next('Order placed successfully: ' + data.succeeded + '/' + data.total);
      },
      error => console.log(JSON.stringify(error))
    );
  }

  onPanicButton() {
    this.tradeService.panicButton().subscribe(
      () => {
        this.activeOrdersComp.onClearAll();
        this.openPositionsComp.onClearAll();
        this._success.next('Panic Button Done');
      },
      error => console.log(JSON.stringify(error))
    );
  }

  onCancelAll() {
    this.tradeService.cancelAll().subscribe(
      () => {},
      error => console.log(JSON.stringify(error))
    );
  }

  changeGlobalSymbol(symbol: string) {
    this.symbolService.symbolGlobal = Symbol[symbol];
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

  openConfirmation(content) {
    if (this.manualTab === 'Market' || this.manualTab === 'Stop') {
      this.modalField1 = 'Market';
    } else if (this.manualTab === 'StopLimit' || this.manualTab === 'Limit') {
      this.modalField1 = this.priceManual.nativeElement.value;
    } else {
      this.modalField1 = this.stopPxManual.nativeElement.value;
    }
    // this.modalField2 = ;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {});
  }
}
