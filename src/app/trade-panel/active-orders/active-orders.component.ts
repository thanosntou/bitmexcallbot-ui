import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {ActiveOrdersService} from '../active-orders.service';
import {SymbolService} from '../../symbol.service';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

  constructor(public authService: AuthenticationService,
              public symbolService: SymbolService,
              public activeOrdersService: ActiveOrdersService) { }

  ngOnInit() {
    this.activeOrdersService.fetchActiveOrders();
  }

  fetchActiveOrders() {
    this.activeOrdersService.fetchActiveOrders();
  }

  onCancelOne(orderId: string) {
    this.activeOrdersService.cancelOne(orderId);
  }

  onCancelAll(symbol: string) {
    this.activeOrdersService.cancelAll(symbol);
  }

}
