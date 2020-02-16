import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActiveOrdersService} from '../../_services/active-orders.service';
import {SymbolService} from '../../_services/symbol.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActiveOrderModel} from '../../_models/active-order.model';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  successMessage: string;
  activeOrders: ActiveOrderModel[];
  private _success = new Subject<string>();

  constructor(private authService: AuthenticationService,
              public symbolService: SymbolService,
              private activeOrdersService: ActiveOrdersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.activeOrdersService.fetchActiveOrdersOf(this.route.snapshot.params['id']).subscribe(
        (data: ActiveOrderModel[]) => this.activeOrders = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
        error => console.log(error)
      );
    } else {
      this.activeOrdersService.fetchActiveOrders().subscribe(
        (data: ActiveOrderModel[]) => this.activeOrders = data.sort((n1, n2) => n1.symbol.localeCompare(n2.symbol)),
        error => console.log(error)
      );
    }
  }

  fetchActiveOrders() {
    return this.activeOrdersService.fetchActiveOrders();
  }

  onCancelOne(clOrdID: string) {
    this.activeOrdersService.cancelOne(clOrdID).subscribe(
      () => this.activeOrders = this.activeOrders.filter(i => i.clOrdID !== clOrdID),
      error => console.log(error)
    );
  }

  onCancelAll(symbol: string) {
    this.activeOrdersService.cancelAll(symbol).subscribe(
      () => this.activeOrders = this.activeOrders.filter(i => i.symbol !== symbol),
      error => console.log(error)
    );
  }

  public onClearAll() {
    this.activeOrders = null;
  }

}
