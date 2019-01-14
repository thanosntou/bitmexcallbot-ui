import { Component, OnInit } from '@angular/core';
import {OrderModel} from '../order.model';
import {HttpClient} from '@angular/common/http';
import {PositionModel} from '../position.model';

@Component({
  selector: 'app-trade-panel',
  templateUrl: './trade-panel.component.html',
  styleUrls: ['./trade-panel.component.css']
})
export class TradePanelComponent implements OnInit {
  baseUrl = 'https://www.bitmexcallbot.com';
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

  // hideOrShow1() {
  //   this.isHidden1 = !this.isHidden1;
  // }
  //
  // hideOrShow2() {
  //   this.isHidden2 = !this.isHidden2;
  // }

}
