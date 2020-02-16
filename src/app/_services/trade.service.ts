import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {OrderReportModel} from '../_models/order-report.model';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {}

  sendSignal(body: string) {
    return this.http.post<void>(BaseUrl.B2 + '/api/v1/trade/signal', body, this.authService.jsonHeaders());
  }

  orderAll(body: string) {
    return this.http.post<OrderReportModel>(BaseUrl.B2 + '/api/v1/trade/orderAll', body, this.authService.jsonHeaders());
  }

  panicButton() {
    return this.http.delete<void>(BaseUrl.B2 + '/api/v1/trade/panic', this.authService.jsonHeaders());
  }

  cancelAll() {
    return this.http.delete<void>(BaseUrl.B2 + '/api/v1/trade/order', this.authService.jsonHeaders());
  }

}
