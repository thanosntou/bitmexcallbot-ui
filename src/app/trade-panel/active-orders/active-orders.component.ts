import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {ActiveOrdersService} from '../active-orders.service';
import {SymbolService} from '../../symbol.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  successMessage: string;
  private _success = new Subject<string>();

  constructor(public authService: AuthenticationService,
              public symbolService: SymbolService,
              public activeOrdersService: ActiveOrdersService) { }

  ngOnInit() {
    this.activeOrdersService.fetchActiveOrders();
  }

  fetchActiveOrders() {
    this.activeOrdersService.fetchActiveOrders();
  }

  onCancelOne(clOrdID: string) {
    this.activeOrdersService.cancelOne(clOrdID);
  }

  onCancelAll(symbol: string) {
    this.activeOrdersService.cancelAll(symbol);
  }

  public onClearAll() {
    this.activeOrdersService.clearAll();
  }

}
