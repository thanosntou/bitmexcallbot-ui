import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../BaseUrl.enum';
import {AuthenticationService} from '../authentication.service';
import {ActiveOrderModel} from '../active-order.model';

@Injectable()
export class ActiveOrdersService {
  activeOrders: ActiveOrderModel[];

  constructor(private http: HttpClient, public authService: AuthenticationService) {}

  fetchActiveOrders() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};

    this.http.get<ActiveOrderModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader/active_orders', httpOptions
    ).subscribe((data: ActiveOrderModel[]) => {
        this.activeOrders = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol));
      }, error => console.log(error)
    );
  }

  cancelOne(orderID: string) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
      })};
    this.http.delete<any>(
      BaseUrl.BASEURL + '/api/v1/trade/order?orderID=' + orderID, httpOptions
    ).subscribe(() => {
        this.activeOrders = this.activeOrders.filter(i => i.orderID !== orderID);
        },
        error => console.log(error)
    );
  }

  cancelAll(symbol: string) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};
    this.http.delete<any>(
      BaseUrl.BASEURL + '/api/v1/trade/order?symbol=' + symbol, httpOptions
    ).subscribe(
      () => {
        this.activeOrders = undefined; },
      error => console.log(error));

  }

}
