import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {BitmexTransactionModel} from '../../_models/bitmex-transaction.model';

@Component({
  selector: 'app-bitmex-wallet-history',
  templateUrl: './bitmex-wallet-history.component.html',
  styleUrls: ['./bitmex-wallet-history.component.css']
})
export class BitmexWalletHistoryComponent implements OnInit {
  bitmexTransactions: BitmexTransactionModel[] = [];

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.fetchWalletHistory(this.route.snapshot.params['id']).subscribe(
      (data: BitmexTransactionModel[]) => this.bitmexTransactions = data,
      error => console.log(error)
    );
  }

}
