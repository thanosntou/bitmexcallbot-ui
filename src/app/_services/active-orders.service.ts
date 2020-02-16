import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {ActiveOrderModel} from '../_models/active-order.model';

@Injectable({
  providedIn: 'root'
})
export class ActiveOrdersService {

  constructor(private http: HttpClient,
              public authService: AuthenticationService) {}

  fetchActiveOrders() {
    return this.http.get<ActiveOrderModel[]>(BaseUrl.B1 + '/api/v1/trader/active-orders', this.authService.jsonHeaders());
  }

  fetchActiveOrdersOf(userId: number) {
    return this.http.get<ActiveOrderModel[]>(BaseUrl.B1 + '/api/v1/customer/active-orders?id=' + userId, this.authService.jsonHeaders());
  }

  cancelOne(clOrdID: string) {
    return this.http.delete<any>(BaseUrl.B1 + '/api/v1/trade/order?clOrdID=' + clOrdID, this.authService.jsonHeaders());
  }

  cancelAll(symbol: string) {
    return this.http.delete<any>(BaseUrl.B1 + '/api/v1/trade/order?symbol=' + symbol, this.authService.jsonHeaders());
  }

}
